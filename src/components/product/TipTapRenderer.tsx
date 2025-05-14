// components/product/TipTapRenderer.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
import { useCallback } from "react";

interface TipTapRendererProps {
  content: any;
}

export default function TipTapRenderer({ content }: TipTapRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      // Link.configure({
      //   openOnClick: false,
      // }),
    ],
    content,
    editable: false,
  });

  return (
    <div className="tiptap-content prose max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}
