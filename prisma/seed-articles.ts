import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import slugify from "slugify";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const techArticles = [
  {
    title: "Masa Depan Kecerdasan Buatan di Industri Teknologi",
    content: "Kecerdasan Buatan (AI) telah berkembang pesat dan mulai mendominasi berbagai sektor, mulai dari kesehatan hingga otomotif. Teknologi seperti Generative AI dan Machine Learning memberikan solusi yang lebih cepat dan akurat untuk memecahkan masalah kompleks yang sebelumnya membutuhkan waktu lama untuk diproses manusia.",
  },
  {
    title: "Mengenal Web3 dan Desentralisasi Internet",
    content: "Web3 hadir sebagai evolusi dari internet yang kita kenal saat ini. Dengan memanfaatkan teknologi blockchain, Web3 menjanjikan internet yang lebih terdesentralisasi, aman, dan memberikan kontrol lebih besar kepada pengguna atas data privasi mereka tanpa perlu bergantung pada perusahaan teknologi besar.",
  },
  {
    title: "5 Framework Frontend Terbaik di Tahun 2026",
    content: "Dunia pengembangan web terus berkembang. Saat ini, Next.js, Remix, SvelteKit, Nuxt, dan Astro menjadi framework frontend yang paling banyak digunakan karena performanya yang luar biasa, kemampuan SSR (Server-Side Rendering), dan pengalaman developer yang sangat baik.",
  },
  {
    title: "Komputasi Kuantum: Revolusi Komputer Masa Depan",
    content: "Komputer kuantum menawarkan kemampuan pemrosesan jutaan kali lebih cepat dibanding superkomputer tradisional. Teknologi ini diyakini akan merevolusi bidang kriptografi, penemuan obat-obatan baru, dan pemodelan cuaca yang sangat kompleks.",
  },
  {
    title: "Keamanan Siber di Era Internet of Things (IoT)",
    content: "Dengan miliaran perangkat yang terhubung ke internet, ancaman keamanan siber semakin meningkat. Artikel ini membahas bagaimana pengembang IoT dapat mengimplementasikan enkripsi yang kuat dan protokol keamanan mutakhir untuk mencegah peretasan.",
  },
  {
    title: "Edge Computing: Mengatasi Keterbatasan Cloud",
    content: "Edge computing memindahkan pemrosesan data lebih dekat ke sumbernya. Hal ini mengurangi latensi dan penggunaan bandwidth secara signifikan, sangat krusial untuk aplikasi real-time seperti kendaraan otonom dan otomatisasi industri.",
  },
  {
    title: "Mengapa Rust Semakin Populer di Kalangan Developer",
    content: "Bahasa pemrograman Rust menjadi favorit banyak developer karena menawarkan keamanan memori tingkat tinggi tanpa mengorbankan performa. Banyak perusahaan besar yang mulai beralih menggunakan Rust untuk sistem backend kritikal mereka.",
  },
  {
    title: "Implementasi 5G dan Dampaknya pada Smart City",
    content: "Jaringan 5G memungkinkan konektivitas super cepat dengan latensi yang sangat rendah. Ini adalah tulang punggung dari konsep Smart City, di mana lalu lintas, manajemen energi, dan layanan publik dapat dipantau dan dioptimalkan secara real-time.",
  },
  {
    title: "Realitas Virtual (VR) dan Realitas Tertambah (AR) di Pendidikan",
    content: "Teknologi VR dan AR mengubah cara siswa belajar dengan menghadirkan simulasi interaktif yang realistis. Mulai dari simulasi operasi bedah hingga tur virtual ke museum sejarah, teknologi ini membuat pembelajaran menjadi jauh lebih menarik.",
  },
  {
    title: "Mengenal Arsitektur Microservices dan Keuntungannya",
    content: "Arsitektur microservices memecah aplikasi monolitik besar menjadi layanan-layanan kecil yang independen. Pendekatan ini memudahkan tim developer untuk melakukan pembaruan, scaling aplikasi, dan mencegah kegagalan sistem secara keseluruhan.",
  },
  {
    title: "Otomatisasi dengan Robotic Process Automation (RPA)",
    content: "RPA membantu perusahaan mengotomatiskan tugas-tugas berulang dan administratif dengan bantuan perangkat lunak (bot). Teknologi ini dapat meningkatkan produktivitas, mengurangi kesalahan manusia, dan memotong biaya operasional.",
  },
  {
    title: "Teknologi Blockchain di Luar Cryptocurrency",
    content: "Selain untuk mata uang digital, blockchain mulai banyak digunakan dalam supply chain management, sistem pemungutan suara elektronik, serta pencatatan medis untuk memastikan transparansi dan keamanan data yang tidak dapat dimanipulasi.",
  },
  {
    title: "Perkembangan Teknologi Baterai untuk Kendaraan Listrik",
    content: "Kendaraan listrik (EV) membutuhkan inovasi baterai untuk meningkatkan jarak tempuh dan mengurangi waktu pengisian daya. Solid-state battery diprediksi akan menjadi teknologi utama yang menggantikan baterai lithium-ion konvensional.",
  },
  {
    title: "Masa Depan Pekerjaan dengan AI Assistant",
    content: "AI Assistant seperti Copilot dan ChatGPT semakin pintar dan mulai diintegrasikan ke dalam alat kerja sehari-hari. Meski ada kekhawatiran mengenai pengurangan lapangan kerja, AI ini justru berpotensi besar meningkatkan produktivitas pekerja.",
  },
  {
    title: "Memahami Konsep Serverless Computing",
    content: "Serverless bukan berarti tidak ada server, melainkan developer tidak perlu lagi mengelola infrastruktur server. Dengan model pay-as-you-go, perusahaan hanya membayar berdasarkan resource komputasi yang benar-benar digunakan saat eksekusi kode.",
  },
  {
    title: "Pemanfaatan Big Data untuk Analisis dan Prediksi Bisnis",
    content: "Dalam era digital, data adalah aset yang sangat berharga. Dengan teknologi analitik Big Data, perusahaan dapat memahami tren perilaku pelanggan, memprediksi permintaan pasar, dan merancang strategi bisnis berbasis data yang lebih akurat.",
  },
  {
    title: "Etika dalam Kecerdasan Buatan (AI Ethics)",
    content: "Seiring dengan semakin canggihnya AI, muncul perdebatan mengenai etika dan bias dalam algoritma. Sangat penting bagi pengembang untuk memastikan AI tidak mendiskriminasi kelompok tertentu dan digunakan secara bertanggung jawab.",
  },
  {
    title: "DevOps dan CI/CD: Praktik Terbaik dalam Deployment",
    content: "Integrasi CI/CD (Continuous Integration / Continuous Deployment) memungkinkan tim engineering untuk merilis fitur baru ke production dengan cepat, aman, dan tanpa downtime. Praktik ini telah menjadi standar industri pengembangan software.",
  },
  {
    title: "Teknologi Biometrik Generasi Selanjutnya",
    content: "Sistem keamanan biometrik kini tidak hanya terbatas pada sidik jari atau pengenalan wajah. Pengenalan pola iris mata, suara, hingga gaya berjalan (gait analysis) mulai dikembangkan untuk tingkat keamanan yang jauh lebih canggih.",
  },
  {
    title: "Membangun Aplikasi Skalabel dengan Kubernetes",
    content: "Kubernetes telah menjadi de facto standar untuk orkestrasi container. Tool ini sangat andal untuk mengelola ribuan container, melakukan auto-scaling, dan memastikan aplikasi tetap berjalan meskipun ada lonjakan traffic yang drastis.",
  },
  {
    title: "Perkembangan Teknologi Wearable untuk Kesehatan",
    content: "Smartwatch dan perangkat wearable kesehatan kini dilengkapi dengan sensor EKG, pemantau oksigen dalam darah (SpO2), dan deteksi kadar glukosa non-invasif, menjadikannya alat pencegahan medis yang sangat efektif.",
  },
  {
    title: "Deep Learning vs Machine Learning: Apa Bedanya?",
    content: "Meski sering digunakan secara bergantian, Machine Learning dan Deep Learning memiliki perbedaan mendasar. Deep Learning menggunakan struktur neural network berlapis (artificial neural networks) yang meniru cara kerja otak manusia untuk memproses data.",
  },
  {
    title: "Smart Home dan Integrasi Perangkat Cerdas",
    content: "Konsep rumah pintar memungkinkan pengguna untuk mengontrol pencahayaan, keamanan, hingga suhu ruangan melalui smartphone atau perintah suara, menciptakan lingkungan tempat tinggal yang lebih nyaman, aman, dan efisien energi.",
  },
  {
    title: "Mengenal GraphQL sebagai Alternatif REST API",
    content: "GraphQL menawarkan fleksibilitas yang tidak dimiliki oleh REST API tradisional. Dengan GraphQL, client dapat meminta data secara spesifik sesuai kebutuhan tanpa mengalami masalah over-fetching (data berlebih) atau under-fetching (data kurang).",
  },
  {
    title: "Pentingnya Aksesibilitas (a11y) dalam Desain Web Modern",
    content: "Membuat website yang dapat diakses oleh semua orang, termasuk penyandang disabilitas, adalah sebuah keharusan. Praktik aksesibilitas web (a11y) yang baik tidak hanya meningkatkan pengalaman pengguna, tetapi juga berdampak positif pada SEO.",
  }
];

async function main() {
  // Ambil salah satu user untuk dijadikan pembuat artikel
  const user = await prisma.user.findFirst({
    where: { email: "user@example.com" },
  });

  if (!user) {
    throw new Error(
      "User tidak ditemukan. Jalankan seeder user (seed-users.ts) terlebih dahulu!"
    );
  }

  const articlesData = techArticles.map((article) => ({
    title: article.title,
    slug: slugify(article.title, {
      lower: true,
      strict: true,
      trim: true,
    }),
    content: article.content,
    published: true,
    userId: user.id,
  }));

  // Masukkan data artikel ke database
  const result = await prisma.post.createMany({
    data: articlesData,
    skipDuplicates: true,
  });

  console.log(`Seeder Artikel selesai. Berhasil menambahkan ${result.count} artikel.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
