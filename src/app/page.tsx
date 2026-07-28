import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import { prisma } from "@/lib/prisma";

import { getExternalPosts } from "@/lib/externalApi";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

async function getInternalPosts() {
  try {
    const dbPosts = await prisma.post.findMany({
      where: { 
        OR: [
          { published: true },
          { status: "published" }
        ]
      },
      orderBy: { createdAt: "desc" },
    });
    
    return dbPosts.map((post) => {
      // Hilangkan tag HTML dari konten untuk preview
      const cleanDesc = post.content.replace(/<[^>]+>/g, '').trim();
      
      return {
        id: `internal-post-${post.id}`,
        slug: post.slug,
        title: post.title,
        content: cleanDesc.substring(0, 160) + "...",
        imageUrl: post.image || `https://picsum.photos/seed/internal_${post.id}/800/500`,
        createdAt: new Date(post.createdAt),
      };
    });
  } catch (error) {
    console.error("Gagal mengambil data dari database lokal:", error);
    return [];
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const search = params?.search?.toLowerCase() || "";
  
  // Ambil dari API dan Database secara bersamaan (Parallel)
  const [externalPosts, internalPosts] = await Promise.all([
    getExternalPosts(),
    getInternalPosts()
  ]);
  
  // Gabungkan (Hybrid) lalu urutkan ulang berdasarkan tanggal terbaru
  const allPosts = [...internalPosts, ...externalPosts].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  // Filter berdasarkan pencarian
  const filteredPosts = allPosts.filter((post) => 
    (post.title ?? "").toLowerCase().includes(search) || 
    post.content.toLowerCase().includes(search)
  );
  
  // Pagination (10 artikel per halaman)
  const limit = 10;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Selamat Datang di <span className="brand-highlight">Brozy News</span></h1>
        <p className="hero-subtitle">
          Dapatkan berita terbaru, informasi terkini, dan artikel pilihan dari berbagai topik terpercaya yang ditulis langsung untuk Anda.
        </p>
      </div>
      <div className="latest-articles-section">
        <div className="section-header">
          <h2 className="section-title">Berita Utama</h2>
          <div className="section-divider"></div>
        </div>
        
        <SearchForm initialSearch={search} basePath="/"/>
        
        <p className="search-result-info" style={{marginBottom: "20px", color: "#6b7280"}}>
          {search && `${totalPosts} berita ditemukan untuk "${search}"`}
        </p>

        <PostList posts={paginatedPosts.map(p => ({ ...p, title: p.title ?? "" }))} />
        
        <Pagination page={page} totalPages={totalPages} basePath="/" search={search}/>
      </div>
    </div>
  );
}
