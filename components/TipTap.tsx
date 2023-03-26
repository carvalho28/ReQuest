import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { Color } from "@tiptap/extension-color";
import { EditorContent, useEditor } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskList } from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useEffect, useState } from "react";

// collab
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

const Tiptap = () => {
  const [content, setContent] = useState("");
  const [provider, setProvider] = useState<HocuspocusProvider>();

  useEffect(() => {
    setProvider(
      new HocuspocusProvider({
        url: "ws://localhost:3000",
        name: "tiptap",
        document: new Y.Doc(),
      })
    );
  }, []);

  const extensions = provider
    ? [
        Collaboration.configure({
          document: provider.document,
        }),
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] } as any),
        StarterKit.configure({
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
      ]
    : [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] } as any),
        StarterKit.configure({
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
      ];

  const editor = useEditor(
    {
      extensions,
      editorProps: {
        attributes: {
          class:
            "prose p-4 prose-md mx-auto mb-12 mx-8 focus:outline-none border-l-2 border-b-2 border-r-2 border-black h-96 max-w-none",
        },
      },
      // content: content,
    },
    [provider]
  );

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
