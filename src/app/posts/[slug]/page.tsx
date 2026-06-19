import React from 'react'
import { getPostBySlug } from '@/lib/api'
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>
}

async function page({params}: PageProps) {
    const {slug} = await params;
    const post = await getPostBySlug(slug);
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
        </>
    )
}

export default page