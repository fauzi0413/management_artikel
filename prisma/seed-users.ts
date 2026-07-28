import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Periksa apakah admin sudah ada agar tidak duplikat
  const existingAdmin = await prisma.user.findFirst({
    where: { email: "admin@example.com" },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        username: "admin_super",
        email: "admin@example.com",
        role: "admin",
        password: hashedPassword,
      },
    });
    console.log("Seeder User: Admin berhasil dibuat.");
  } else {
    console.log("Seeder User: Admin sudah ada.");
  }

  // Periksa apakah user sudah ada agar tidak duplikat
  const existingUser = await prisma.user.findFirst({
    where: { email: "user@example.com" },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: "User",
        username: "user_biasa",
        email: "user@example.com",
        role: "user",
        password: hashedPassword,
      },
    });
    console.log("Seeder User: User biasa berhasil dibuat.");
  } else {
    console.log("Seeder User: User biasa sudah ada.");
  }

  console.log("Seeder User selesai.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
