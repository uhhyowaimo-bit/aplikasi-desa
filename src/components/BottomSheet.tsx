"use client";
import React, { useEffect, useRef, useState } from "react";

interface BottomSheetProps {
  onClose: () => void;
  content: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose, content }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);

  // Handle drag gesture
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const delta = e.clientY - startY.current;
    if (delta > 0) setTranslateY(delta);
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (translateY > 100) {
      onClose(); // close sheet if dragged enough
    } else {
      setTranslateY(0); // reset position
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          zIndex: 999,
        }}
      ></div>

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px 20px 40px 20px",
          zIndex: 1000,
          transform: `translateY(${translateY}px)`,
          transition: dragging ? "none" : "transform 0.3s ease",
          maxHeight: "70vh",
          overflowY: "auto",
          touchAction: "none", // prevent scroll conflict
        }}
      >
        {/* Drag Handle */}
        <div
          style={{
            width: "50px",
            height: "6px",
            background: "#ccc",
            borderRadius: "999px",
            margin: "0 auto 15px auto",
          }}
        ></div>

        {/* Content */}
        <div>{content}</div>
      </div>
    </>
  );
};

export default BottomSheet;
