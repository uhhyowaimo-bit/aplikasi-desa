import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.pengajuanSurat.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, status } = body;

  const updated = await prisma.pengajuanSurat.update({
    where: { id },
    data: { status },
  });

  return Response.json(updated);
}
