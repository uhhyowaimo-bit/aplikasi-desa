import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET berita by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const berita = await prisma.berita.findUnique({
    where: { id: Number(params.id) },
  });
  if (!berita) return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
  return NextResponse.json(berita);
}

// PUT (update) berita
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.berita.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}

// DELETE berita
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.berita.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: `Berita ID ${params.id} dihapus` });
}
