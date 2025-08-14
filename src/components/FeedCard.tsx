"use client";

interface FeedCardProps {
  title: string;
  source: string;
  image: string;
  content: string;
}

export default function FeedCard({ title, source, image, content }: FeedCardProps) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <img src={image} alt={title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
      <div style={{ padding: "12px" }}>
        <h4 style={{ margin: "0 0 6px" }}>{title}</h4>
        <p style={{ color: "#666", fontSize: "13px", marginBottom: "8px" }}>Sumber: {source}</p>
        <p style={{ fontSize: "14px" }}>{content}</p>
      </div>
    </div>
  );
}
