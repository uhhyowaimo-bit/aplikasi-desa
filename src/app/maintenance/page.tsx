'use client';
import React, { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext'; // Mengambil context dark mode

const MaintenancePage = () => {
  const { dark } = useAppContext(); // Mengambil nilai dark mode dari context

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Pastikan halaman mengisi seluruh layar
        backgroundColor: dark ? '#111' : '#fff', // Sesuaikan dengan dark mode
        color: dark ? '#fff' : '#000', // Sesuaikan dengan dark mode
        padding: '20px',
        flexDirection: 'column', // Menjaga elemen vertikal
        width: '100%',
        margin: 0,
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        We're Currently Under Maintenance
      </h2>
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px', // Membatasi lebar konten
          width: '100%', // Agar konten responsif
        }}
      >
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          Sorry for the inconvenience! Our website is undergoing scheduled
          maintenance.
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          We are working hard to bring you the best experience. Please check
          back soon!
        </p>

        {/* Gambar Testimoni */}
        <img
          src="/images/test.png" // Ganti dengan path gambar testimoni Anda
          alt="Testimonial"
          style={{
            width: '100%',
            maxWidth: '400px', // Batasi ukuran gambar
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Menambahkan shadow pada gambar
          }}
        />
      </div>
    </div>
  );
};

export default MaintenancePage;
