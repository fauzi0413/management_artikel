import "dotenv/config";
import { prisma } from "./prisma";
import slugify from "slugify";

async function main() {
  console.log("🚀 Starting to generate slugs...");

  const posts = await prisma.post.findMany({
    where: {
      slug: null,
    },
    orderBy: {
      id: "asc",
    },
  });

  console.log(`📄 Found ${posts.length} posts without slug`);

  for (const post of posts) {
    console.log(`\nProcessing Post ${post.id}: ${post.title}`);

    const baseSlug = slugify(post.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.post.findFirst({
        where: {
          slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        slug,
      },
    });

    console.log(`✅ Updated -> ${slug}`);
  }

  console.log("\n🎉 All slugs generated successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });