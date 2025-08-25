'use client';
import React, { useState, useEffect, useRef } from 'react';

// Data untuk Slide
const slides = [
  {
    title: 'Struktur Organisasi Pemerintah Desa',
    color: '#a3a3a3',
    content: 'Desa Kampale menganut Struktur Organisasi Tata Kelembagaan (SOTK) Pemerintahan Desa dengan pola minimal, sebagai berikut :',
    image: '/images/STR.png',
  },
  {
    title: 'Struktur Organisasi BPD',
    color: '#a3a3a3',
    image: '/images/BPD.png',
  },
];

const ProfilDesa = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  // Tutup popup dengan klik luar & tombol Esc
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setIsPopupOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setIsPopupOpen(false);

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  const { title, color, content, image, } = slides[currentSlide];

  return (
    <div
      style={{
        padding: 20,
        background: color,
        borderRadius: 12,
        color: '#fff',
        width: '100%',
        maxWidth: 620,
        margin: 'auto',
        boxShadow: '0 8px 20px rgba(0,0,0,.15)',
        position: 'relative',
      }}
    >
      <h3 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', margin: 0 }}>{title}</h3>

      <p
        style={{
          fontSize: 16,
          textAlign: 'justify',
          margin: '16px 0 12px',
          whiteSpace: 'pre-line',
        }}
      >
        {content}
      </p>

      {/* Gambar (klik untuk popup) */}
      {image && (
        <img
          src={image}
          alt={title}
          onClick={() => setIsPopupOpen(true)}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 10,
            marginTop: 6,
            cursor: 'zoom-in',
            display: 'block',
          }}
        />
      )}


      {/* Tombol navigasi kiri/kanan */}
      <button
        aria-label="Sebelumnya"
        onClick={prevSlide}
        style={navBtnStyle('left')}
      >
        ‹
      </button>
      <button
        aria-label="Berikutnya"
        onClick={nextSlide}
        style={navBtnStyle('right')}
      >
        ›
      </button>

      {/* POPUP GAMBAR (lightbox tanpa kotak panel) */}
      {isPopupOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPopupOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.7)', // backdrop gelap saja
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 12,
          }}
        >
          {/* Shell transparan hanya untuk centering & scroll */}
          <div
            ref={popupRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto', // bisa scroll kalau gambarnya tinggi
              background: 'transparent',
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 8,
                boxShadow: '0 6px 18px rgba(0,0,0,.35)',
                cursor: 'zoom-out',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ===== util style tombol navigasi ===== */
const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  [side]: 10,
  transform: 'translateY(-50%)',
  width: 36,
  height: 36,
  borderRadius: '9999px',
  border: 'none',
  background: 'rgba(0,0,0,.28)',
  color: '#fff',
  fontSize: 24,
  lineHeight: 1,
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,.25)',
});

export default ProfilDesa;
