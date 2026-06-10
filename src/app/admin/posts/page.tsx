import { prisma } from "@/lib/prisma";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import { FaEye } from "react-icons/fa";
import PostTable from "@/components/PostTable";

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function AdminPostsPage({ searchParams }: PageProps) {
    const params  = await searchParams;
    const search = params.search || "";
    const page = parseInt(
        params.page || "1"
    );
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
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

    include: {
        user: true,
    },

    orderBy: {
        createdAt: "desc",
    },

    skip,
    take: limit,
    });

    const totalPosts =
    await prisma.post.count({
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

    const totalPages = Math.ceil(
    totalPosts / limit
    );

  return (
    <div className="dashboard-page">
      <h1>Manage Posts</h1>

      <SearchForm initialSearch={search} basePath="/admin/posts" />

      <div className="table-card">
        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No Posts Found</h3>
            <p>
              No posts match your search.
            </p>
          </div>
        ):(
            <>
            <PostTable posts={posts} skip={skip} />
            <Pagination
                page={page}
                totalPages={totalPages}
                basePath="/admin/posts"
                search={search}
            />
        </>
        )}
      </div>
    </div>
  );
}