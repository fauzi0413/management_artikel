import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import slugify from "slugify";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      password: hashedPassword,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "User",
      email: "user@example.com",
      role: "user",
      password: hashedPassword,
    },
  });

  const articles = Array.from({ length: 25 }, (_, i) => {
    const title = `Artikel ${i + 1}`;

    return {
      title,
      slug: slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      }),
      content: `
Artikel ke-${i + 1} membahas topik pengembangan aplikasi menggunakan Next.js,
Prisma, PostgreSQL, TypeScript, dan praktik terbaik dalam membangun aplikasi fullstack modern.
      `.trim(),
      published: true,
      userId: user.id,
    };
  });

  await prisma.post.createMany({
    data: articles,
  });

  console.log("Seed berhasil");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });