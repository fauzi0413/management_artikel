import React from 'react'
import Link from 'next/link'

interface PostListProps {
    posts: Array<{
        id: number;
        slug: string;
        title: string;
        content: string;
    }>;
}

function PostList({posts}: PostListProps) {
  return (
    <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
  )
}

export default PostList