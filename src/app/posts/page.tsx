import React from 'react'
import { getAllPostIds, getTotalPosts } from '@/lib/api'
import PostList from '@/components/PostList';
import SearchForm from '@/components/SearchForm';
import Pagination from '@/components/Pagination';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

async function page({searchParams}: PageProps) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.search || "";

  const allPostIds = await getAllPostIds(page, search);
  const totalPosts = await getTotalPosts(search);
  const totalPages = Math.ceil(totalPosts / 10);
    
  return (
    <div className='main-heading'>
        <h1>All Posts</h1>
        <p className='subtitle'>Discover insightful articles, tutorials, and practical guides shared by our community of developers and technology enthusiasts.</p>
        <SearchForm initialSearch={search} basePath="/posts"/>
        
        <p className="search-result-info">
          {search && `${totalPosts} articles found for "${search}"`}
        </p>

        <PostList posts={allPostIds}/>
        <Pagination page={page} totalPages={totalPages} basePath="/posts"/>
    </div>
  )
}

export default page