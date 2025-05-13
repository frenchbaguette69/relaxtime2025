// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Make sure this directory path works with your VPS setup
// You might need to adjust the path based on your server configuration
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const fileEntry of files) {
      if (!(fileEntry instanceof File)) {
        continue;
      }

      const file = fileEntry as File;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Generate a unique filename
      const fileExt = path.extname(file.name);
      const fileName = `${uuidv4()}${fileExt}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      // Convert the file to an ArrayBuffer
      const buffer = await file.arrayBuffer();

      // Write the file to the filesystem
      await writeFile(filePath, Buffer.from(buffer));

      // Create a URL that points to the uploaded file
      const fileUrl = `/uploads/${fileName}`;
      uploadedUrls.push(fileUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 },
      );
    }

    const filePath = path.join(UPLOAD_DIR, filename);

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete the file
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "File deletion failed" },
      { status: 500 },
    );
  }
}
