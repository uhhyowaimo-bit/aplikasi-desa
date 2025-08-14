import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { videoPath } = await req.json();
    if (!videoPath) return NextResponse.json({ error: "Path video tidak ada" }, { status: 400 });

    const gifName = path.basename(videoPath, path.extname(videoPath)) + ".gif";
    const gifPath = path.join(process.cwd(), "public", "gifs", gifName);

    // Pastikan folder gifs ada
    fs.mkdirSync(path.join(process.cwd(), "public", "gifs"), { recursive: true });

    // Jalankan ffmpeg buat GIF
    await execAsync(
      `ffmpeg -i "${videoPath}" -t 3 -vf "fps=10,scale=320:-1:flags=lanczos" "${gifPath}"`
    );

    return NextResponse.json({ url: `/gifs/${gifName}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat GIF" }, { status: 500 });
  }
}
