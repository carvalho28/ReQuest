import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  RiBold,
  RiCodeBoxLine,
  RiCodeFill,
  RiDeleteBinLine,
  RiDeleteColumn,
  RiDeleteRow,
  RiDoubleQuotesL,
  RiFormatClear,
  RiH1,
  RiH2,
  RiImageAddLine,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiItalic,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
  RiMarkPenLine,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiTableLine,
  RiTextWrap,
} from "react-icons/ri";

const MenuBar = ({ editor }: any) => {
  const supabaseClient = useSupabaseClient();

  if (!editor) {
    return null;
  }

  async function addNewImage() {
    // open file explorer
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    let fileName;
    let file;
    const randomString = Math.random().toString(36).substring(2, 15);

    input.onchange = async () => {
      if (!input.files) return;
      // file = input.files?.item(0);
      file = input.files?.item(0);
      console.log("file", file);

      if (!file) return;
      fileName = `${randomString}-${file.name}`;
      console.log("filename", fileName);

      if (file && fileName) {
        console.log("fileInside", file);

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

        console.log("url", url);

        editor?.chain().focus().setImage({ src: url }).run();
      }
    };
  }

  return (
    <div className="flex flex-row flex-wrap gap-3 border-2 border-black rounded-t-lg p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <RiBold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <RiItalic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <RiStrikethrough size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <RiCodeFill size={20} />
      </button>
      {/* button  to highlight text */}
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        <RiMarkPenLine size={20} />
      </button>

      {/* divider */}
      <div className="border-r-2 border-gray-300 h-6"></div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <RiH1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <RiH2 size={20} />
      </button>

      {/* paragraph */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <RiParagraph size={20} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <RiListUnordered size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <RiListOrdered size={20} />
      </button>
      {/* task item */}
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "is-active" : ""}
      >
        <RiListCheck2 size={20} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <RiCodeBoxLine size={20} />
      </button>

      {/* divider */}
      <div className="border-r-2 border-gray-300 h-6"></div>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <RiDoubleQuotesL />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RiSeparator size={20} />
      </button>

      {/* divider */}
      <div className="border-r-2 border-gray-300 h-6"></div>

      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <RiTextWrap size={20} />
      </button>

      {/* remove styling */}
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <RiFormatClear size={20} />
      </button>

      {/* divider */}
      <div className="border-r-2 border-gray-300 h-6"></div>

      {/* table buttons */}
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <RiTableLine size={20} />
      </button>

      {/* delete table */}
      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        {/* make an icon for delete */}
        <RiDeleteBinLine size={20} />
      </button>

      {/* insert row bottom */}
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>
        <RiInsertRowBottom size={20} />
      </button>

      {/* insert row top */}
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>
        <RiInsertRowTop size={20} />
      </button>

      {/* delete row */}
      <button onClick={() => editor.chain().focus().deleteRow().run()}>
        <RiDeleteRow size={20} />
      </button>

      {/* insert column left */}
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        <RiInsertColumnLeft size={20} />
      </button>

      {/* insert column right */}
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        <RiInsertColumnRight size={20} />
      </button>

      {/* delete column */}
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>
        <RiDeleteColumn size={20} />
      </button>

      {/* divider */}
      <div className="border-r-2 border-gray-300 h-6"></div>

      {/* image button */}
      <button onClick={() => addNewImage()}>
        <RiImageAddLine size={20} />
      </button>
    </div>
  );
};

export default MenuBar;
