import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest, { params }: any) {
  const { filename } = (await params) as { filename: string };

  // Join the path segments to get the full file path
  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Get the file's content and MIME type
  const fileExtension = path.extname(filePath).toLowerCase();
  const mimeType = getMimeType(fileExtension);

  // Return the file content with appropriate headers
  const fileContent = fs.readFileSync(filePath);
  return new NextResponse(fileContent, {
    headers: {
      "Content-Type": mimeType ?? "application/octet-stream",
    },
  });
}

function getMimeType(extension: string): string | null {
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".json": "application/json",
  };

  return mimeTypes[extension] ?? null;
}
