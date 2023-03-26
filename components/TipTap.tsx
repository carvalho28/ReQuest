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

const Tiptap = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit.configure({
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
    ],
    editorProps: {
      attributes: {
        class:
          "prose p-4 prose-md mx-auto mb-12 mx-8 focus:outline-none border-l-2 border-b-2 border-r-2 border-black h-96 max-w-none",
      },
    },
    content: content,
    // content: `
    //       <h2>
    //         Hi there,
    //       </h2>
    //       <p>
    //         this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    //       </p>
    //       <ul>
    //         <li>
    //           That’s a bullet list with one …
    //         </li>
    //         <li>
    //           … or two list items.
    //         </li>
    //       </ul>
    //       <p>
    //         Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    //       </p>
    //       <pre><code class="language-css">body {
    //   display: none;
    // }</code></pre>
    //       <p>
    //         I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    //       </p>
    //       <blockquote>
    //         Wow, that’s amazing. Good work, boy! 👏
    //         <br />
    //         — Mom
    //       </blockquote>
    //     `,
  });

  useEffect(() => {
    console.log("content", editor?.getHTML());
  }, [editor?.getHTML()]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
