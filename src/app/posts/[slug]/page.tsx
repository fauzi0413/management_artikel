import React from 'react'
import { getPostBySlug, getRelatedPosts } from '@/lib/api'
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>
}

async function page({params}: PageProps) {
    const {slug} = await params;
    const post = await getPostBySlug(slug);
    const relatedPosts = await getRelatedPosts(slug, post?.title || "");
    if (!post) {
        return (
            <>
            <Link href="/"><span className='back-link'>Back to Home</span></Link>
            <div className="post-detail">
                <h1>Post not found</h1>
            </div>
            </>
        )
    }
    return (
        <>
        <Link href="/"><span className='back-link'>Back to Home</span></Link>
        <div className="post-detail">
            <h1>{post.title}</h1>
            <p className="post-date">
                Dibuat pada{" "}
                {new Date(post.createdAt).toLocaleString("id-ID", {
                    timeZone: "Asia/Jakarta",
                    dateStyle: "full",
                    timeStyle: "short",
                })}
            </p>
            <p>{post.content}</p>
        </div>
        
        {relatedPosts.length > 0 && (
        <div className="related-posts">
            <h2>Related Articles</h2>

            <div className="related-list">
            {relatedPosts.map((item) => (
                <div key={item.slug} className="related-item">
                <Link href={`/posts/${item.slug}`}>
                    <h3>{item.title}</h3>
                </Link>

                <p>
                    {item.content.length > 100
                        ? `${item.content.slice(0, 100)}...`
                        : item.content}
                </p>
                </div>
            ))}
            </div>
        </div>
        )}
        </>
    )
}

export default page