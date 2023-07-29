import { Hocuspocus } from "@hocuspocus/server";
import { createClient } from "@supabase/supabase-js";
import {
  TiptapTransformer,
} from "@hocuspocus/transformer";
import StarterKit from "@tiptap/starter-kit";
import dotenv from "dotenv";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

const server = new Hocuspocus({
  address: "0.0.0.0",
  port: 8090,
});

server.configure({
  async onStoreDocument(data) {
    const userId = data.requestParameters.get("userId");
    const newDate = new Date();
    // Save to database
    const proseMirrorJSON = TiptapTransformer.fromYdoc(
      data.document,
      "default"[
      (StarterKit,
        TextStyle,
        Placeholder,
        Highlight,
        TaskList,
        TaskItem,
        CodeBlockLowlight,
        Color,
        Image,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Collaboration,
        CollaborationCursor)
      ]
    );
    const { errordb } = await supabase
      .from("requirements")
      .update({
        description: proseMirrorJSON,
        updated_at: newDate,
        updated_by: userId,
      })
      .eq("id", data.documentName);
    if (errordb) {
      console.log("error", errordb);
      return;
    }
  },

  async onLoadDocument(data) {
    // Load from database
    const documentName = data.document.name;
    console.log("documentName", documentName);

    const { data: datadb, error: errordb } = await supabase
      .from("requirements")
      .select("description")
      .eq("id", documentName);
    if (errordb) {
      console.log("error", errordb);
      return;
    }
    const desc = JSON.parse(datadb[0].description);

    const content = TiptapTransformer.toYdoc(desc.default, "default", [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextStyle,
      Placeholder,
      Highlight,
      TaskList,
      TaskItem,
      CodeBlockLowlight,
      Color,
      Image,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Collaboration,
      CollaborationCursor,
    ]);
    // set the document's content to the loaded content
    data.document.merge(content);
  },
});

server.listen();
