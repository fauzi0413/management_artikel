'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PostListProps {
    posts: Array<{
        id: number | string;
        slug?: string;
        url?: string;
        title: string;
        content: string;
        imageUrl?: string | null;
    }>;
}

function PostList({posts}: PostListProps) {
  return (
    <div className="post-list-stack">
        {posts.map((post) => {
          const content = post.content || "";
          const truncatedContent = content.length > 150 ? content.substring(0, 150) + '...' : content;
          
          const InnerContent = () => (
            <>
              {post.imageUrl && (
                <div className="post-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://picsum.photos/800/500?grayscale';
                    }}
                  />
                </div>
              )}
              <div className="post-card-content">
                <h3 className="post-card-title">{post.title}</h3>
                <p className="post-card-excerpt">{truncatedContent}</p>
                <span className="post-card-readmore">{post.url ? "Baca di sumber asli \u2192" : "Baca selengkapnya \u2192"}</span>
              </div>
            </>
          );

          if (post.url) {
            return (
              <a href={post.url} target="_blank" rel="noopener noreferrer" key={post.id} className="post-card-horizontal">
                <InnerContent />
              </a>
            );
          }

          return (
            <Link href={`/posts/${post.slug}`} key={post.id} className="post-card-horizontal">
              <InnerContent />
            </Link>
          );
        })}
      </div>
  )
}

export default PostList