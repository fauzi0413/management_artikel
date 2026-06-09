import React from 'react'
import { getPostById } from '@/lib/api'
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>
}

async function page({params}: PageProps) {
    const {id} = await params;
    const post = await getPostById(Number(id));
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