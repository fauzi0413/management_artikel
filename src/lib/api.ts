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
    include: {
      user: {
        select: {
          name: true,
          username: true,
        }
      }
    }
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
export async function getRelatedPosts(
  currentSlug: string,
  currentTitle: string,
  limit = 3
) {
  const keywords = currentTitle
    .split(" ")
    .filter((word) => word.length > 3);

  let relatedPosts = await prisma.post.findMany({
    where: {
      slug: {
        not: currentSlug,
      },
      OR: keywords.map((word) => ({
        title: {
          contains: word,
          mode: "insensitive",
        },
      })),
    },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
    },
    take: limit,
  });

  // Fallback jika tidak ada artikel yang related
  if (relatedPosts.length === 0) {
    relatedPosts = await prisma.post.findMany({
      where: {
        slug: {
          not: currentSlug,
        },
        // published: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  if (relatedPosts.length < limit) {
    const additionalPosts =
      await prisma.post.findMany({
        where: {
          slug: {
            notIn: [
              currentSlug,
              ...relatedPosts.map(
                (post) => post.slug
              ),
            ],
          },
        },
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit - relatedPosts.length,
      });

    relatedPosts = [
      ...relatedPosts,
      ...additionalPosts,
    ];
  }

  return relatedPosts;
}