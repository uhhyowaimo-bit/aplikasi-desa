'use client';

import React, { useState } from 'react';
import PetaDesa from '@/components/Peta';

type TextSlide = {
  title: string;
  color: string;
  content?: string;
  image?: string;
  type?: 'text';
  link?: string;        // <-- link opsional khusus slide bergambar
  linkLabel?: string;   // <-- label tombol opsional
};

type MapSlide = {
  title: string;
  color: string;
  content?: string;
  type: 'map';
};

type Slide = TextSlide | MapSlide;

const slides: Slide[] = [
  {
    title: 'Peta Lokasi',
    color: '#ef4444',
    content: 'Berikut tampilan dari desa kampale di maps',
    image: '/images/peta-desa.png',
    type: 'text',
    link: 'https://maps.google.com/?q=Desa+Kampale', // ganti sesuai URL tujuanmu
    linkLabel: 'Buka di Google Maps',
  },
  {
    title: 'Open Source Map',
    color: '#ef4444',
    content: 'Tampilan Lokasi Desa Kampale',
    type: 'map', // ini terhubung OSM, tidak kita buat link
  },
];

export default function ProfilDesa() {
  const [current, setCurrent] = useState(0);
  const s = slides[current];

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div
      style={{
        padding: 20,
        background: s.color,
        borderRadius: 12,
        color: '#fff',
        width: '100%',
        maxWidth: 520,
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Title */}
      {s.title && (
        <h3 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {s.title}
        </h3>
      )}

      {/* Konten teks */}
      {s.content && (
        <div
          style={{
            fontSize: 16,
            textAlign: 'justify',
            whiteSpace: 'pre-line',
            marginTop: 8,
            marginBottom:
              (('image' in s && s.image) || s.type === 'map') ? 10 : 0,
          }}
        >
          {s.content}
        </div>
      )}

      {/* Gambar (klik → buka link, hanya kalau slide punya link) */}
      {'image' in s && s.image && (
        s.link ? (
          <a
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            title={s.linkLabel || 'Buka tautan'}
            style={{ display: 'block' }}
          >
            <img
              src={s.image}
              alt={s.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                display: 'block',
                cursor: 'pointer',
              }}
            />
          </a>
        ) : (
          <img
            src={s.image}
            alt={s.title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              display: 'block',
            }}
          />
        )
      )}

      {/* Peta OSM (tanpa link) */}
      {s.type === 'map' && <PetaDesa />}

      {/* CTA button di bawah (optional, hanya jika link ada) */}
      {'link' in s && s.link && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <a
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(0,0,0,.18)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,.2)',
              display: 'inline-block',
            }}
          >
            {s.linkLabel ?? 'Kunjungi Link'}
          </a>
        </div>
      )}

      {/* Tombol prev/next */}
      <button
        onClick={prev}
        aria-label="Sebelumnya"
        style={navBtnStyle('left')}
      >
        {'<'}
      </button>
      <button
        onClick={next}
        aria-label="Berikutnya"
        style={navBtnStyle('right')}
      >
        {'>'}
      </button>
    </div>
  );
}

const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  [side]: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.28)',
  border: 'none',
  borderRadius: 8,
  padding: '6px 10px',
  color: '#fff',
  fontSize: 18,
  cursor: 'pointer',
});
