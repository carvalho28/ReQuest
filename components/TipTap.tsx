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

interface TiptapProps {
  name: string;
}

const Tiptap = ({ name }: TiptapProps) => {
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
    setProvider(
      new HocuspocusProvider({
        url: "wss://little-rain-5635.fly.dev/",
        // url: "ws://localhost:1234",
        name: "tiptap",
        document: new Y.Doc(),
      })
    );
  }, []);

  function generatePastelColor() {
    // Set the saturation and lightness to a fixed value to generate a pastel color
    const saturation = 50; // 50% saturation
    const lightness = 75; // 75% lightness

    // Generate a random hue between 0 and 360
    const hue = Math.floor(Math.random() * 360);

    // Convert the HSL color to RGB
    const hslToRgb = (h: number, s: number, l: number) => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r, g, b;
      if (h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (h < 300) {
        r = x;
        g = 0;
        b = c;
      } else {
        r = c;
        g = 0;
        b = x;
      }
      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
      };
    };

    // Convert the RGB color to a hex string
    const rgbToHex = (r: number, g: number, b: number) => {
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    };

    // Convert the HSL color to RGB and then to a hex string
    const { r, g, b } = hslToRgb(hue, saturation / 100, lightness / 100);
    const hexColor = rgbToHex(r, g, b);

    return hexColor;
  }

  const commonExtensions = [
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
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ];

  const extensions = provider
    ? [
        Collaboration.configure({
          document: provider.document,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: name,
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
            "prose p-4 prose-md mx-auto mb-12 mx-8 focus:outline-none border-l-2 border-b-2 border-r-2 border-black max-w-none",
          style: "min-height: 20em;",
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
