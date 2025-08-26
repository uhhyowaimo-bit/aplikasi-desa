// components/LogoAndDate.tsx
import React from "react";

const LogoAndDate = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="/logo.png"
        alt="Logo Desa"
        style={{
          width: "45px",
          height: "45px",
          marginRight: "10px",
          borderRadius: "50%",
          border: "none",
        }}
      />
      <div>
        <h3 style={{ margin: 0, fontSize: "20px" }}>Website Desa</h3>
        <p style={{ margin: 0, fontSize: "14px" }}>Proklamasi Kemerdekaan R.I.</p>
      </div>
    </div>
  );
};

export default LogoAndDate;
