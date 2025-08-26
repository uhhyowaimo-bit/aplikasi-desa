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
        padding: '20px',
        background: slides[currentSlide].color, // Warna latar belakang mengikuti warna slide aktif
        borderRadius: '12px',
        color: '#fff',
        width: '100%',
        maxWidth: '500px', // Ukuran maksimum kotak
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Bayangan untuk efek 3D
        transition: 'transform 0.3s ease', // Efek transisi saat berpindah slide
        position: 'relative', // Supaya tombol bisa diposisikan dengan absolute di dalam konten
      }}
    >
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        {slides[currentSlide].title} {/* Menampilkan judul sesuai dengan slide aktif */}
      </h3>
      <p style={{ fontSize: '16px', textAlign: 'justify', margin: '20px 0', whiteSpace: "pre-line", }}>
        {slides[currentSlide].content} {/* Menampilkan konten sesuai dengan slide aktif */}

      </p>

  {/* Menampilkan gambar jika ada */}
      {slides[currentSlide].image && (

        <Image
          src={slides[currentSlide].image as string}
          alt={slides[currentSlide].title ?? 'Slide image'}


          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginTop: '10px',
          }}
        />
      )}

      {/* Tombol navigasi */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Memastikan tombol di tengah
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%', // Lebar tombol disesuaikan dengan area tombol
        }}
      >
        <button
          onClick={prevSlide}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default ProfilDesa;
