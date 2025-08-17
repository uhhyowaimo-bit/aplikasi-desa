'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import ProfilDesa from '@/components/ProfilDesa/ProfilDesa';
import Pemerintahan from '@/components/ProfilDesa/Pemerintahan';
import DataDesa from '@/components/ProfilDesa/DataDesa';
import PrestasiInstansi from '@/components/ProfilDesa/PrestasiInstansi';
import PetaDesa from '@/components/ProfilDesa/PetaDesa';
import InovasiDesa from '@/components/ProfilDesa/InovasiDesa';
import SDGS from '@/components/ProfilDesa/SDGS';
import IDM from '@/components/ProfilDesa/IDM';

const menuItems = [
  { title: 'Profil Desa', component: <ProfilDesa />, color: '#f97316', icon: '🏠' },
  { title: 'Pemerintahan', component: <Pemerintahan />, color: '#a3a3a3', icon: '🏛️' },
  { title: 'Data Desa', component: <DataDesa />, color: '#4ade80', icon: '📊' },
  { title: 'Peta', component: <PetaDesa />, color: '#ef4444', icon: '🗺️' },
  { title: 'Prestasi Instansi', component: <PrestasiInstansi />, color: '#60a5fa', icon: '🏆' },
  { title: 'Inovasi Desa', component: <InovasiDesa />, color: '#0f172a', icon: '💡' },
  { title: 'SDGS', component: <SDGS />, color: '#facc15', icon: '🌱' },
  { title: 'IDM', component: <IDM />, color: '#f59e0b', icon: '📅' },
];

export default function LayananPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { dark } = useAppContext();

  const colors = {
    bg: dark ? '#0b0b0b' : '#f6f7f8',
    surface: dark ? '#141414' : '#ffffff',
    text: dark ? '#f4f4f5' : '#0f0f10',
    sub: dark ? '#bababa' : '#5b5b5b',
  };

  // Lock scroll saat modal terbuka + support tombol Esc
  useEffect(() => {
    if (activeIndex !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveIndex(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  return (
    <main className="page" style={{ background: colors.bg, color: colors.text }}>
      <div className="container">
        <header className="header">
          <h1>Menu Utama</h1>
          <p className="sub">Pilih salah satu menu di bawah untuk menampilkan kontennya.</p>
        </header>

        <div className="grid">
          {menuItems.map((item, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                className={`card ${active ? 'active' : ''}`}
                style={{ background: item.color }}
                onClick={() => setActiveIndex(active ? null : i)}
                aria-pressed={active}
              >
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

     {/* ===== MODAL OVERLAY DI TENGAH LAYAR (TANPA KOTAK & TANPA X) ===== */}
{activeIndex !== null && (
  <div
    className="overlay"
    role="dialog"
    aria-modal="true"
    onClick={() => setActiveIndex(null)} // klik backdrop = tutup
  >
    {/* Shell hanya untuk center & scroll; TIDAK ada background */}
    <div
      className="contentShell"
      onClick={(e) => e.stopPropagation()} // biar klik dalam tidak nutup
    >
      {/* Yang tampil cuma komponennya */}
      <div className="contentBody">
        {menuItems[activeIndex].component}
      </div>
    </div>
  </div>
)}


     <style jsx>{`
  .page { 
    min-height: 100dvh;
    background: transparent !important; /* 🔥 hapus hitam full */ 
  }

  /* Container transparan (hilangkan kotak hitam di belakang ikon) */
  .container {
  width: 100%;
  max-width: 1280px;
  padding: 24px 16px 40px;
  margin: 0 auto;

  background: transparent;  /* 🔥 hilangin kotak hitam full */
}


  .header { text-align: center; margin-bottom: 20px; }
  h1 { font-weight: 800; margin: 0; font-size: clamp(20px, 2.2vw, 28px); }
  .sub { margin-top: 6px; color: ${colors.sub}; font-size: clamp(12px, 1.4vw, 14px); }

  /* GRID RESPONSIF */
  .grid {
    display: grid;
    gap: 18px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px) { .grid { grid-template-columns: repeat(4, 1fr); } }

  .card {
    appearance: none;
    border: 0;
    border-radius: 16px;
    color: #fff;
    min-height: 140px;
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0,0,0,.22);
    transition: transform .18s ease, box-shadow .22s ease, opacity .18s ease;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.32); }
  .card.active { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,.38); }

  .icon { font-size: 34px; line-height: 1; }
  .title { margin-top: 10px; font-weight: 700; font-size: 16px; line-height: 1.2; }

  /* OVERLAY */
  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.45); /* backdrop tipis */
    z-index: 1000;
    animation: fadeIn .2s ease;
    padding: 16px; /* aman di layar kecil */
  }

  /* Shell transparan untuk center & scroll */
  .contentShell {
    width: min(96vw, 1100px);
    max-height: 88vh;
    overflow: auto; /* biar bisa scroll */
    position: relative;
    background: transparent;
    box-shadow: none;
    border: none;
  }

  /* Body: tampilkan komponen langsung */
  .contentBody {}

  /* Animasi */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`}</style>

    </main>
  );
}
