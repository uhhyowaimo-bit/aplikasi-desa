import { prisma } from "@/lib/prisma";
import { Artikel } from "@/types/artikel";
import Image from "next/image"; // Mengimpor komponen Image dari Next.js

export default async function ArtikelDetail({
  params,
}: {
  params: { slug: string }; // Menyediakan tipe params untuk slug
}) {
  const artikel = (await prisma.berita.findUnique({
    where: { slug: params.slug },
  })) as Artikel | null;

  if (!artikel) return <p>Artikel tidak ditemukan.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{artikel.title}</h1>
      <p style={{ color: "#777" }}>
        {artikel.date} · {artikel.author || "Admin"} · {artikel.viewers} kali dilihat
      </p>

      {artikel.mediaType === "video" ? (
        <video controls style={{ width: "100%", margin: "20px 0" }}>
          <source src={artikel.image} type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>
      ) : (
        <Image
          src={artikel.image}
          alt={artikel.title}
          width={1200} // Gantilah dengan lebar yang sesuai
          height={800} // Gantilah dengan tinggi yang sesuai
          style={{ width: "100%", margin: "20px 0", borderRadius: "8px" }}
        />
      )}

      <div style={{ whiteSpace: "pre-line", fontSize: "18px", lineHeight: "1.6" }}>
        {artikel.content}
      </div>
    </div>
  );
}
