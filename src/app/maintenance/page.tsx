// maintenance/page.tsx (Next.js / React Example)

import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="maintenance-page">
      <h2 className="maintenance-header">We're Currently Under Maintenance</h2>
      <div className="maintenance-content">
        <p>Sorry for the inconvenience! Our website is undergoing scheduled maintenance.</p>
        <p>We are working hard to bring you the best experience. Please check back soon!</p>
        
        {/* Gambar Testimoni */}
        <img
          src="/images/test.png" // Ganti dengan path gambar testimoni Anda
          alt="Testimonial"
          className="maintenance-image"
        />
      </div>
    </div>
  );
};

export default MaintenancePage;
