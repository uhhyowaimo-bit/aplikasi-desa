"use client";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function SwipePages({
  pages,
  activeIndex,
  onIndexChange,
}: {
  pages: React.ReactNode[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}) {
  const [index, setIndex] = useState(activeIndex);

  useEffect(() => setIndex(activeIndex), [activeIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const newIndex = Math.min(index + 1, pages.length - 1);
      setIndex(newIndex);
      onIndexChange(newIndex);
    },
    onSwipedRight: () => {
      const newIndex = Math.max(index - 1, 0);
      setIndex(newIndex);
      onIndexChange(newIndex);
    },
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      style={{
        display: "flex",
        transform: `translateX(-${index * 100}%)`,
        transition: "transform 0.3s ease-in-out",
        width: `${pages.length * 100}%`,
      }}
    >
      {pages.map((page, idx) => (
        <div key={idx} style={{ width: "100%", flexShrink: 0 }}>
          {page}
        </div>
      ))}
    </div>
  );
}
