'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";


// Data untuk Slide: title, color, dan konten
const slides = [
  {
    title: "Sejarah",
    color: "#f97316", // Oranye
    content: "Pemberian nama Kampale sudah terbentuk sejak pemerintahan Kepala Kampung Lamakkarennu Tahun 1930. Nama Kampale ini adalah hasil kesepakatan para kepala suku kampung saat itu. Kampale merupakan tempat pusat pemerintahan dari tahun 1930 sampai 1942. Tahun 1943 Kepala Kampung Lamakkarennu meninggal dunia lalu digantikan Andi Kancilu. Andi Kancilu saat itu bertempat tinggal di Kalosi, sehingga pusat pemerintahan pindah di Kalosi. Terjadinya pembentukan atau pemekaran desa, karena pada dasarnya masyarakat Kampale sudah memenuhi persyaratan untuk memisahkan diri dan membentuk satu desa, hal ini untuk memudahkan masyarakat Kampale mengurus segala keperluannya. Sehingga para pemuka agama dan masyarakat mengadakan rapat untuk mengusulkan kepada Desa Induk (Desa Kalosi) untuk rencana pemekaran desa. Jadi Kepala Desa Kalosi terpaksa mengadakan musyawarah dengan tokoh agama, masyarakat dan anggota BPD, lalu mengajukan usulan kepada Camat Dua Pitue sehingga terbitlah Surat Camat Dua Pitue No. 893../26/VII/PEM/Tanggal 31 Juli 2009.Terlampir Berita Acara rapat penetapan Kepala Desa Sementara dan SK Kepala Desa Terpilih (Defentif) Desa Kampale Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang. Demikian sejarah terbentuknya Desa Kampale.",
  },
  {
    title: "Kondisi Geografi",
    color: "#f97316", // Abu-abu
    content: `Desa Kampale terletak di batas-batas wilayah antara lain:
			Sebelah Utara 		: Desa Kalosi
			Sebelah Selatan		: Desa Sappa & Desa Wele Kab. Wajo
      Sebelah Timur		: Desa Kalosi & Desa Kalosi Alau
			Sebelah Barat		: Kel. Salomallori & Kel. Tanrutedong

      Titik koordinat kantor desa terletak di :
Garis Lintang					: -0,773139
Garis Bujur						: 112,249146
Ketinggian Dari Permukaan Air Laut 	: 24 mdpl

Adapun luas area wilayah desa terdiri dari
Luas Wilayah		 				      	: 6,70 Km2
Luas persawahan 					      : 502,7000  Ha
Luas perkebunan 					      : 31,2300 Ha
Luas pekuburan 					        : 1 Ha
Luas pekarangan 					      : 10,00 Ha
Luas perkantoran Desa			      : 3 Are
Luas prasarana umum lainnya 		: -

Orbitasi Waktu Tempuh dan Jarak
Jarak Ke Ibukota Kecamatan 		      : 5,2  Km
Jarak Ke Ibukota Kabupaten       		: 34 Km
Jarak Ke Ibukota Propinsi          	: 206 Km
Waktu Tempuh Ke Ibukota Kecamatan 	: 15 Menit
Waktu Tempuh Ke Ibukota Kabupaten 	: 59 Menit
Waktu tempuh ke ibukota Provinsi	  : 4 Jam 30 Menit

    `,},
  {
    
    color: "#f97316", // Hijau
    content: "Prasarana umum yang ada di Desa Kampale antara lain :",
    image: "/images/data-desa.png", // Gambar yang akan ditambahkan di slide 3
  },

  {
    title: "Kondisi Demografi",
    color: "#f97316", // Hijau
    content: 'Berikut tabel yang menunjukkan jumlah penduduk Desa Kampale Tahun 2023 :',
    image: "/images/data-desa2.png", // Gambar yang akan ditambahkan di slide 3
  },

   {
    color: "#f97316", // Hijau
    content: 'Berdasarkan pertumbuhan jumlah penduduk di setiap Tahunnya dapat dilihat berdasarkan tabel berikut ini :',
    image: "/images/data-desa3.png", // Gambar yang akan ditambahkan di slide 3
  },

   {
    color: "#f97316", // Hijau
    content: 'Berikut perbandingan persentase jenis mata pencaharian penduduk Desa Kampale antara lain ',
    image: "/images/data-desa4.png", // Gambar yang akan ditambahkan di slide 3
  },

  {
    color: "#f97316", // Hijau
    content: 'Jumlah Penduduk Desa Kampale sesuai dengan Tingkatan Pendidika ',
    image: "/images/data-desa5.png", // Gambar yang akan ditambahkan di slide 3
  },

  {
    color: "#f97316", // Hijau
    content: 'Jumlah penduduk desa Kampale menurut agama yang dipeluk dapat dilihat pada tabel dibawah ini : ',
    image: "/images/data-desa6.png", // Gambar yang akan ditambahkan di slide 3
  },

];

const ProfilDesa = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Menyimpan indeks slide aktif
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Untuk menampilkan atau menyembunyikan popup
  const popupRef = useRef<HTMLDivElement | null>(null); // Reference untuk popup

  // Fungsi untuk berpindah slide ke kanan
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Menggunakan modulus untuk loop
  };

  // Fungsi untuk berpindah slide ke kiri
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Menggunakan modulus untuk loop
  };

  // Menambahkan event listener ketika popup terbuka dan menghapusnya ketika tidak diperlukan
  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Menutup popup ketika klik di luar
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // Menghapus event listener
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  // Fungsi untuk menutup popup ketika klik di luar
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false); // Menutup popup
    }
  };

  // Fungsi untuk membuka popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div
      style={{
        padding: 20,
        background: s.color,
        borderRadius: 12,
        color: "#fff",
        width: "100%",
        maxWidth: "100%",  // Adjusted for mobile responsiveness
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        position: "relative",
        boxSizing: 'border-box', // To include padding in the width calculation
      }}
    >
      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
        {s.title}
      </h3>

      {/* Konten + Gambar disamping */}
      <div
        style={{
          display: "flex",
          flexDirection: s.image ? "row" : "column", // Kalau ada gambar → sejajar
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",  // Ensure content wraps on smaller screens
        }}
      >
        <div style={{ flex: 1, fontSize: "1rem", textAlign: "justify", wordBreak: "break-word" }}>
          {s.content}
        </div>

        {s.image && (

          <Image
            src={s.image}
            alt={s.title}
            width={200}  // Adjusted width
            height={150} // Adjusted height
            style={{
              borderRadius: 8,
              objectFit: "cover",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        )}
      </div>

      {/* Tombol Navigasi */}
      <button
        onClick={prevSlide}
        aria-label="Sebelumnya"
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.28)",
          border: "none",
          borderRadius: 8,
          padding: "6px 10px",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        aria-label="Berikutnya"
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.28)",
          border: "none",
          borderRadius: 8,
          padding: "6px 10px",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default ProfilDesa;
