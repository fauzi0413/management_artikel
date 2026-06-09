import React from 'react'
import { getAllPostIds, getTotalPosts } from '@/lib/api'
import PostList from '@/components/PostList';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function page({searchParams}: PageProps) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const allPostIds = await getAllPostIds(page);
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / 10);
  const getPageNumbers = () => {
      const pages: (number | string)[] = [];

      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }

        return pages;
      }

      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          page - 1,
          page,
          page + 1,
          "...",
          totalPages
        );
      }

      return pages;
    };
    
  return (
    <div className='main-heading'>
        <h2>All Posts</h2>
        <p className='subtitle'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, ut aut? Delectus dolor distinctio itaque necessitatibus quasi commodi sit beatae.</p>
        <PostList posts={allPostIds}/>
        <div className="pagination">
            {page > 1 && (
                <Link
                href={`/posts?page=${page - 1}`}
                className="pagination-nav"
                >
                ← Prev
                </Link>
            )}

            {getPageNumbers().map((item, index) =>
                item === "..." ? (
                <span key={`dots-${index}`} className="pagination-dots">
                    ...
                </span>
                ) : (
                <Link
                    key={`${item}-${index}`}
                    href={`/posts?page=${item}`}
                    className={`pagination-number ${
                        page === item ? "active" : ""
                    }`}
                    >
                    {item}
                </Link>
                )
            )}

            {page < totalPages && (
                <Link
                href={`/posts?page=${page + 1}`}
                className="pagination-nav"
                >
                Next →
                </Link>
            )}
            </div>
    </div>
  )
}

export default page