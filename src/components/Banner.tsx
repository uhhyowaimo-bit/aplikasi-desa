"use client";
import { useState, useEffect } from "react";

export default function Banner() {
  const [countdown, setCountdown] = useState("");
  const targetDate = new Date("2025-08-17T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setCountdown("Acara Selesai");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days} H : ${hours} J : ${minutes} M : ${seconds} D`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 shadow">
      <h2 className="text-2xl font-bold">Desa Kalosi Alau</h2>
      <p className="mt-1">Jalan Poros Sengkang No.39, Kode POS 91681</p>
      <p>Kecamatan Dua Pitue Kabupaten Sidenreng Rappang, Provinsi Sulawesi Selatan</p>
      <p className="mt-2">📞 082188855161 | ✉️ desakalosialau27e@gmail.com</p>
      <div className="mt-4 text-2xl font-mono">{countdown}</div>
    </section>
  );
}
