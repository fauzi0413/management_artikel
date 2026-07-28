import React from 'react'
import { getPostBySlug, getRelatedPosts } from '@/lib/api'
import Link from 'next/link';
import PostList from '@/components/PostList';
import { getExternalPosts } from '@/lib/externalApi';

interface PageProps {
    params: Promise<{ slug: string }>
}

async function page({params}: PageProps) {
    const {slug} = await params;
    const post = await getPostBySlug(slug);
    const relatedPosts = await getRelatedPosts(slug, post?.title || "");
    const externalPosts = await getExternalPosts();
    
    // Ambil 2 berita eksternal teratas sebagai tambahan artikel terkait
    const selectedExternalPosts = externalPosts.slice(0, 2);
    
    // Format artikel internal agar sesuai dengan props PostList
    const formattedInternalPosts = relatedPosts.map(item => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        content: item.content.replace(/<[^>]+>/g, '').trim(),
        imageUrl: `https://picsum.photos/seed/internal_${item.id}/800/500`,
    }));

    // Gabungkan artikel internal dan eksternal
    const combinedRelatedPosts = [...formattedInternalPosts, ...selectedExternalPosts];
    if (!post) {
        return (
            <>
            <div className="post-detail">
                <div style={{ marginBottom: "20px" }}>
                    <Link href="/" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: 0, textDecoration: "none" }}>
                        <span>&larr;</span> Kembali ke Beranda
                    </Link>
                </div>
                <h1>Postingan Tidak Ditemukan</h1>
            </div>
            </>
        )
    }
    return (
        <>
        <div className="post-detail">
            <div style={{ marginBottom: "20px" }}>
                <Link href="/" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: 0, textDecoration: "none" }}>
                    <span>&larr;</span> Kembali ke Beranda
                </Link>
            </div>
            <h1>{post.title}</h1>
            <p className="post-date">
                Dibuat pada{" "}
                {new Date(post.createdAt).toLocaleString("id-ID", {
                    timeZone: "Asia/Jakarta",
                    dateStyle: "full",
                    timeStyle: "short",
                })}
                {" "}oleh <strong>{post.user?.name || "Penulis Tidak Diketahui"}</strong>
                {post.user?.username && <span style={{ color: "#6b7280" }}> (@{post.user.username})</span>}
            </p>
            <div className="post-detail-image" style={{ margin: "20px 0", borderRadius: "8px", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={post.image || `https://picsum.photos/seed/internal_${post.id}/1200/600`} 
                    alt={post.title} 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                />
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/&nbsp;/g, ' ') }} />
        </div>
        
        {combinedRelatedPosts.length > 0 && (
        <div className="related-posts">
            <h2>Related Articles</h2>

            <div style={{ marginTop: "20px" }}>
                <PostList posts={combinedRelatedPosts.map(p => ({ ...p, title: p.title ?? "" }))} />
            </div>
        </div>
        )}
        </>
    )
}

export default page