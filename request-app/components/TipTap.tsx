import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TaskItem from "@tiptap/extension-task-item";
import { Color } from "@tiptap/extension-color";
import { EditorContent, useEditor } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskList } from "@tiptap/extension-task-list";
import { useEffect, useState } from "react";

// collab
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

// code blocks
import { lowlight } from "lowlight/lib/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";

// images
import Image from "@tiptap/extension-image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// tables
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import { generatePastelColor } from "./utils/general";

interface TiptapProps {
  userId: string;
  reqId: string;
  reqDescription: string;
  userName: string;
  reqCreatedAt: string;
  reqCreatedBy: string;
  reqName: string;
  reqUpdatedBy: string;
  reqUpdatedAt: string;
  createdBy: string;
}

/**
 * Tiptap component is the main component used to render the editor and its definitions
 * @param userId - The user id of the current user
 * @param userName - The user name of the current user
 * @param reqId - The request id of the current request
 * @param reqDescription - The request description of the current request
 * @param reqCreatedAt - The request created at of the current request
 * @param reqCreatedBy - The request created by of the current request
 * @param reqName - The request name of the current request
 * @param createdBy - The created by of the current request
 * @returns Returns the Tiptap component base
 */
const Tiptap = ({
  userId,
  userName,
  reqId,
  reqDescription,
  reqCreatedAt,
  reqCreatedBy,
  reqName,
  createdBy,
}: TiptapProps) => {
  const supabaseClient = useSupabaseClient();

  const [content, setContent] = useState("");
  const [provider, setProvider] = useState<HocuspocusProvider>();

  useEffect(() => {
    lowlight.registerLanguage("html", html);
    lowlight.registerLanguage("css", css);
    lowlight.registerLanguage("javascript", js);
    lowlight.registerLanguage("typescript", ts);
    lowlight.registerLanguage("json", json);
    lowlight.registerLanguage("bash", bash);
    lowlight.registerLanguage("python", python);
    lowlight.registerLanguage("java", java);
    lowlight.registerLanguage("c", c);
    lowlight.registerLanguage("cpp", cpp);
  }, []);

  useEffect(() => {
    if (provider) {
      provider.destroy();
    }
    // setContent(reqDescription);
    console.log("reqId", reqId);
    const newProvider = new HocuspocusProvider({
      url: "ws://localhost:8080",
      parameters: {
        userId: userId,
      },
      name: reqId.toString(),
      document: new Y.Doc({
        guid: reqId.toString(),
      }),
    });
    setProvider(newProvider);

    // Return a cleanup function that will be called when the component unmounts
    return () => {
      newProvider.destroy();
    };
  }, [reqDescription]);

  useEffect(() => {
    if (content === reqDescription) {
      return;
    }
    // setContent(reqDescription);
  }, [reqDescription]);

  const commonExtensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as any),
    StarterKit.configure({
      codeBlock: false,
      history: false,
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    Placeholder.configure({
      emptyEditorClass: "is-editor-empty",
    }),
    Highlight.configure({
      multicolor: true,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Image.configure({
      inline: true,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];

  const extensions = provider
    ? [
        Collaboration.configure({
          document: provider.document,
          // field: "body",
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: userName,
            color: generatePastelColor(),
          },
        }),
        ...commonExtensions,
      ]
    : [...commonExtensions];

  const editor = useEditor(
    {
      extensions,
      editorProps: {
        attributes: {
          class:
            "prose p-4 prose-md mx-auto mb-2 mx-8 focus:outline-none border-l-2 border-b-2 border-r-2 border-black max-w-none",
          style: "min-height: 20em;",
        },
      },
    },
    [provider]
  );

  async function addImageOnDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      // generate random string for file name
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileName = `${randomString}-${file.name}`;

      if (file) {
        const { data, error } = await supabaseClient.storage
          .from("images-editor")
          .upload(`${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log("error", error);
          return;
        }

        // get a url for the uploaded file
        const { data: urlData } = await supabaseClient.storage
          .from("images-editor")
          .createSignedUrl(`${fileName}`, 365 * 24 * 60 * 60);

        const url = urlData?.signedUrl as string;

        editor?.chain().focus().setImage({ src: url }).run();
      }
    }
  }

  return (
    <>
      <div className="p-2">
        <MenuBar editor={editor} reqName={reqName} />
        <EditorContent
          editor={editor}
          onDrop={addImageOnDrop}
          className="element"
        />
      </div>
      <div className="text-md text-neutral-400 flex justify-end mr-4 italic -mb-4">
        Created by {createdBy} on{" "}
        {new Date(reqCreatedAt).toLocaleDateString("pt-PT", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </div>
      <div className="modal-action md:p-4 p-1">
        <label
          htmlFor="my-modal-5"
          className="btn bg-contrast text-white border-0 hover:bg-contrasthover hover:cursor-pointer"
          // onClick={() => closeProvider()}
        >
          Done
        </label>
      </div>
    </>
  );
};

export default Tiptap;
