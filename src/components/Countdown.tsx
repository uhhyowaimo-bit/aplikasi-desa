// components/Countdown.tsx
import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-08-17T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) {
        setCountdown("Hari Proklamasi Telah Tiba!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days} Hari : ${hours} Jam : ${minutes} Menit : ${seconds} Detik`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{countdown}</p>
    </div>
  );
};

export default Countdown;
