import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    // Ambil form data dari request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Validasi jika file tidak ada
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Mengkonversi file menjadi buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Direktori penyimpanan file
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Pastikan direktori 'uploads' ada
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error("Directory creation failed:", err);
      return NextResponse.json({ error: "Gagal membuat direktori" }, { status: 500 });
    }

    // Menyimpan file ke direktori yang sudah dibuat
    const filePath = path.join(uploadsDir, file.name);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${file.name}`;

    let gifUrl = "";

    // Kalau file adalah video → generate thumbnail GIF
    if (file.type.startsWith("video")) {
      const fileNameParts = file.name.split(".");
      const gifName = fileNameParts.length > 1 ? `${fileNameParts[0]}.gif` : `${file.name}.gif`;  // Pastikan ekstensi ada
      const gifPath = path.join(uploadsDir, gifName);

      try {
        const command = `ffmpeg -i "${filePath}" -t 3 -vf "fps=10,scale=320:-1" -y "${gifPath}"`;
        await execPromise(command);
        gifUrl = `/uploads/${gifName}`;
      } catch (ffmpegErr) {
        console.error("GIF generation error:", ffmpegErr);
        return NextResponse.json({ error: "Gagal membuat GIF dari video" }, { status: 500 });
      }
    }

    return NextResponse.json({ url: fileUrl, gifUrl });
  } catch (err: Error) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan saat mengupload file" }, { status: 500 });
  }
}
