import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kode = searchParams.get("kode");

  if (!kode) {
    return new Response("Kode tidak disediakan", { status: 400 });
  }

  const data = await prisma.pengajuanSurat.findUnique({
    where: { kodeVerifikasi: kode },
  });

  if (!data) {
    return new Response("Tidak ditemukan", { status: 404 });
  }

  return Response.json(data);
}
