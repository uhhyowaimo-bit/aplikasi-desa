import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = Date.now() + "-" + file.name;
  const filepath = path.join(uploadsDir, filename);
  fs.writeFileSync(filepath, buffer);

  let gifPath = "";
  if (file.type.startsWith("video/")) {
    const gifName = filename.replace(/\.[^/.]+$/, ".gif");
    gifPath = path.join(uploadsDir, gifName);
    await execPromise(`ffmpeg -y -i "${filepath}" -t 3 -vf "fps=10,scale=320:-1" "${gifPath}"`);
  }

  return NextResponse.json({
    url: "/uploads/" + filename,
    gifUrl: gifPath ? "/uploads/" + path.basename(gifPath) : null,
  });
}
