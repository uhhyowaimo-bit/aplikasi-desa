"use client";
import { useState } from "react";

export default function FormTambahBerita({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-media", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    setMediaUrl(data.url);
    setThumbnail(data.gifUrl || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (file && !mediaUrl) await handleUpload();
      if (!mediaUrl) throw new Error("Media belum terupload!");

      const newBerita = {
        title, description, content,
        image: mediaUrl, thumbnail, mediaType,
        author, viewers: 0,
      };

      const res = await fetch("/api/berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBerita),
      });

      if (!res.ok) throw new Error("Gagal menambah berita");

      onSuccess();
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Gagal menambah berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Isi artikel lengkap" value={content} onChange={(e) => setContent(e.target.value)} required style={{ height: "200px" }} />
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="image">Gambar</option>
        <option value="video">Video</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button type="submit" style={{ background: "green", color: "white", padding: "10px" }} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
