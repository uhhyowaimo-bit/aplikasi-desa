import React from "react";
import { BeritaItem } from "@/types";

export const BeritaListItem: React.FC<BeritaItem> = ({
  title,
  description,
  image,
  viewers,
  author,
  date,
}) => {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
      <img
        src={image}
        alt={title}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "15px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>
        <div style={{ fontSize: "12px", color: "#999", display: "flex", justifyContent: "space-between" }}>
          <span>{viewers} views</span>
          <span>{author} · {date}</span>
        </div>
      </div>
    </div>
  );
};
