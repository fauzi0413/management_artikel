import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function backfillUsernames() {
  const users = await prisma.user.findMany({
    where: {
      username: "",
    },
  });

  console.log(`Ditemukan ${users.length} user tanpa username. Memperbarui...`);

  for (const user of users) {
    // Buat username dari email atau nama
    const baseName = user.name
      ? user.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      : user.email.split("@")[0].replace(/[^a-z0-9]/g, "");
    
    let username = `${baseName}${Math.floor(Math.random() * 900) + 100}`;
    
    // Pastikan unik
    let isUnique = false;
    while (!isUnique) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (!existing) {
        isUnique = true;
      } else {
        username = `${baseName}${Math.floor(Math.random() * 9000) + 1000}`;
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { username },
    });
    
    console.log(`User ${user.email} -> username: ${username}`);
  }

  console.log("Selesai memperbarui username.");
}

backfillUsernames()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
