import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Simpan video ke /public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // Buat thumbnail GIF
    const gifName = `${Date.now()}-preview.gif`;
    const gifPath = path.join(uploadsDir, gifName);
    await execPromise(`ffmpeg -y -i "${filePath}" -t 3 -vf "fps=10,scale=320:-1:flags=lanczos" "${gifPath}"`);

    return NextResponse.json({
      videoUrl: `/uploads/${fileName}`,
      gifUrl: `/uploads/${gifName}`,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload gagal" }, { status: 500 });
  }
}
