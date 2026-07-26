import { execSync } from "child_process";

console.log("Memulai proses seeding (User & Artikel)...");

try {
  console.log("=> Menjalankan Seeder User...");
  execSync("npm run seed:users", { stdio: "inherit" });

  console.log("=> Menjalankan Seeder Artikel...");
  execSync("npm run seed:articles", { stdio: "inherit" });

  console.log("Semua proses seeding telah selesai dengan sukses!");
} catch (error) {
  console.error("Gagal menjalankan proses seeding", error);
  process.exit(1);
}