# BrozyNews — Sistem Manajemen Artikel

Aplikasi web manajemen artikel berbasis **Next.js 15** yang dilengkapi dengan autentikasi pengguna, panel admin, dan editor artikel rich-text. Dibangun sebagai proyek pembelajaran Next.js dengan stack modern dan fitur lengkap.

## ✨ Fitur

- 📝 **Manajemen Artikel** — Buat, edit, dan hapus artikel dengan editor rich-text (React Quill)
- 🔐 **Autentikasi** — Login & registrasi dengan NextAuth.js, password di-hash menggunakan bcrypt
- 👤 **Manajemen Pengguna** — Role-based access (user / admin)
- 🔗 **Auto Slug** — Slug artikel dibuat otomatis menggunakan `slugify`
- 🌙 **Dark Mode** — Dukungan tema terang/gelap via `next-themes`
- 📊 **Panel Admin** — Halaman admin khusus untuk mengelola konten dan pengguna
- 🗄️ **Database** — PostgreSQL dengan Prisma ORM

## 🛠️ Tech Stack

| Teknologi | Versi |
|---|---|
| Next.js | 15.x (Turbopack) |
| React | 19.x |
| TypeScript | 5.x |
| Prisma ORM | 7.x |
| PostgreSQL | — |
| NextAuth.js | 4.x |
| TailwindCSS | 4.x |
| React Quill | 3.x |
| Sonner (toast) | 2.x |

## 🚀 Memulai

### 1. Clone & Install

```bash
git clone <repo-url>
cd belajar-nextjs
npm install
```

### 2. Konfigurasi Environment

Salin file contoh environment dan isi variabelnya:

```bash
cp env.example .env
```

Variabel yang perlu diisi di `.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migrasi
npx prisma migrate dev

# (Opsional) Seed data awal
npm run seed
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── admin/          # Panel admin
│   ├── api/            # API Routes (users, posts, auth)
│   ├── login/          # Halaman login
│   ├── register/       # Halaman registrasi
│   ├── post/           # Halaman detail artikel
│   └── posts/          # Halaman daftar & buat artikel
├── components/         # Komponen UI yang dapat digunakan ulang
├── lib/                # Utilitas & konfigurasi (Prisma, auth, API)
└── types/              # TypeScript type definitions
```

## 📜 Scripts

```bash
npm run dev          # Jalankan development server (Turbopack)
npm run build        # Build production (prisma generate + next build)
npm run start        # Jalankan production server
npm run seed         # Seed semua data awal
npm run seed:users   # Seed data pengguna saja
npm run seed:articles # Seed data artikel saja
```

## 🗃️ Model Database

- **User** — id, email, username, name, password, role, timestamps
- **Post** — id, title, content, image, status, slug, published, userId, timestamps
