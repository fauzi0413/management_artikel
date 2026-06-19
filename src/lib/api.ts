import { prisma } from "./prisma";

export async function getLastPost() {
  return await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllPostIds(
  page: number,
  search: string
) {
  const limit = 10;
  const skip = (page - 1) * limit;

  return await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostById(id: number) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
  });
}

export async function getTotalPosts(
  search: string
) {
  return await prisma.post.count({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}