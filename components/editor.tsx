/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTheme } from "next-themes";

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  fontFamily?: string;
};

const Editor = ({
  onChange,
  initialContent,
  editable,
  fontFamily
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const [isEditable, setIsEditable] = useState(editable);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    });

    return response.url;
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? JSON.parse(initialContent) as PartialBlock[]
      : undefined,
    
    uploadFile: handleUpload
  })

  const fontClass =
  fontFamily === "serif"
    ? "font-serif"
    : fontFamily === "mono"
    ? "font-mono"
    : "font-sans";

  return (
    <div className={fontClass}>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}
        editable={isEditable}
      />
    </div>
  )
};

export default Editor;