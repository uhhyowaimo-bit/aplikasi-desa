import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// GET semua berita
export async function GET() {
  const berita = await prisma.berita.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(berita);
}

// POST tambah berita
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let slug = generateSlug(body.title);

    // Kalau slug sama → tambah angka unik
    let counter = 1;
    let existing = await prisma.berita.findUnique({ where: { slug } });
    while (existing) {
      slug = `${generateSlug(body.title)}-${counter++}`;
      existing = await prisma.berita.findUnique({ where: { slug } });
    }

    const newBerita = await prisma.berita.create({
  data: {
    title: body.title,
    description: body.description || "",
    content: body.content || "",
    image: body.image || "",
    thumbnail: body.thumbnail || "",  // <-- Tambahkan ini
    mediaType: body.mediaType || "image",
    date: body.date || new Date().toLocaleDateString("id-ID"),
    author: body.author || "Admin",
    viewers: body.viewers || 0,
    slug,
  },
});


    return NextResponse.json(newBerita);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat artikel" }, { status: 500 });
  }
}
