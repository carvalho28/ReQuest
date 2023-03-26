import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiCodeBoxLine,
  RiCodeFill,
  RiDoubleQuotesL,
  RiFormatClear,
  RiH1,
  RiH2,
  RiItalic,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
  RiMarkPenLine,
  RiParagraph,
  RiSeparator,
  RiStrikethrough,
  RiTextWrap,
} from "react-icons/ri";

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
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

      {/* <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <RiArrowGoBackLine size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RiArrowGoForwardLine size={20} />
      </button> */}
    </div>
  );
};

export default MenuBar;
