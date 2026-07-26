import React from "react";
import { APP_VERSION } from "@/lib/version";

export default async function Page() {
  // Memberikan jeda buatan (artificial delay) selama 800ms agar animasi skeleton dapat dinikmati 
  // karena halaman Tentang ini sebenarnya tidak memuat API sama sekali.
  await new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <div className="main-heading" style={{ textAlign: "center" }}>
      <img 
        src="/logo.png" 
        alt="BrozyNews Logo" 
        style={{ width: "150px", height: "auto", margin: "0 auto 20px", display: "block", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      />
      <h1>Tentang BrozyNews</h1>

      <p className="subtitle" style={{ maxWidth: "800px", margin: "0 auto 20px" }}>
        BrozyNews adalah portal agregator berita modern yang mengumpulkan dan menyajikan 
        kabar-kabar terkini dari berbagai media raksasa di Indonesia (seperti Antara News, 
        CNBC, CNN, Republika, dan Okezone) secara real-time.
      </p>

      <p style={{ maxWidth: "800px", margin: "0 auto 30px", lineHeight: "1.7" }}>
        Misi kami adalah memberikan pengalaman membaca berita yang super cepat, nyaman, dan 
        terpusat. Tanpa harus mengunjungi puluhan situs web berbeda, kini Anda dapat menikmati ratusan 
        artikel terbaru seputar Teknologi, Bisnis, Otomotif, hingga Hiburan dalam satu platform yang elegan.
      </p>

      <div className="about-version">
        <h3>Version Information</h3>
        <p>
          Current Version: <strong>v{APP_VERSION}</strong>
        </p>
      </div>
    </div>
  );
}