export async function getExternalPosts() {
  try {
    const rssFeeds = [
      "https://www.antaranews.com/rss/tekno.xml",
      "https://www.antaranews.com/rss/otomotif.xml",
      "https://www.antaranews.com/rss/ekonomi.xml",
      "https://www.antaranews.com/rss/hiburan.xml",
      "https://www.antaranews.com/rss/gaya-hidup.xml",
      "https://www.antaranews.com/rss/politik.xml",
      "https://www.antaranews.com/rss/hukum.xml",
      "https://www.antaranews.com/rss/olahraga.xml",
      "https://www.antaranews.com/rss/dunia.xml",
      "https://www.cnbcindonesia.com/tech/rss",
      "https://www.cnbcindonesia.com/market/rss",
      "https://www.cnbcindonesia.com/entrepreneur/rss",
      "https://www.cnbcindonesia.com/investment/rss",
      "https://www.cnbcindonesia.com/news/rss",
      "https://www.cnbcindonesia.com/syariah/rss",
      "https://www.cnbcindonesia.com/lifestyle/rss",
      "https://www.cnnindonesia.com/teknologi/rss",
      "https://www.cnnindonesia.com/ekonomi/rss",
      "https://www.cnnindonesia.com/hiburan/rss",
      "https://www.cnnindonesia.com/nasional/rss",
      "https://www.cnnindonesia.com/internasional/rss",
      "https://www.cnnindonesia.com/olahraga/rss",
      "https://www.cnnindonesia.com/gaya-hidup/rss",
      "https://www.republika.co.id/rss/tekno",
      "https://www.republika.co.id/rss/nasional",
      "https://www.republika.co.id/rss/internasional",
      "https://www.republika.co.id/rss/ekonomi",
      "https://www.republika.co.id/rss/olahraga",
      "https://sindikasi.okezone.com/index.php/techno/RSS2.0",
      "https://sindikasi.okezone.com/index.php/news/RSS2.0",
      "https://sindikasi.okezone.com/index.php/economy/RSS2.0",
      "https://sindikasi.okezone.com/index.php/sports/RSS2.0",
      "https://tekno.tempo.co/rss",
      "https://nasional.tempo.co/rss",
      "https://bisnis.tempo.co/rss",
      "https://metro.tempo.co/rss",
      "https://dunia.tempo.co/rss",
      "https://www.jawapos.com/nasional/rss",
      "https://www.jawapos.com/entertainment/rss",
      "https://www.jawapos.com/kesehatan/rss",
      "https://www.jawapos.com/otomotif/rss",
      "https://sindonews.com/feed",
      "https://www.vice.com/id/rss"
    ];

    const fetchPromises = rssFeeds.map(url => 
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, {
        next: { revalidate: 3600 }
      })
      .then(res => res.ok ? res.json() : null)
      .catch(() => null)
    );

    const results = await Promise.all(fetchPromises);
    
    interface RssArticle {
      title?: string;
      pubDate: string;
      description?: string;
      thumbnail?: string;
      link?: string;
      [key: string]: unknown;
    }

    let allArticles: RssArticle[] = [];
    results.forEach(json => {
      if (json && json.items) {
        allArticles = [...allArticles, ...json.items];
      }
    });

    allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    return allArticles.map((article: RssArticle, index: number) => {
      const rawDesc = article.description || "";
      
      const imgMatch = rawDesc.match(/<img[^>]+src="([^">]+)"/i);
      let imageUrl = imgMatch ? imgMatch[1] : null;
      
      if (!imageUrl && article.thumbnail) {
        imageUrl = article.thumbnail;
      }
      if (!imageUrl && article.enclosure) {
        const enclosure = article.enclosure as Record<string, string>;
        if (enclosure.link) imageUrl = enclosure.link;
      }
      
      if (!imageUrl || imageUrl.trim() === "") {
        let keyword = "news,journalism";
        const linkStr = (article.link || "").toLowerCase();
        const titleStr = (article.title || "").toLowerCase();
        
        if (linkStr.includes("tekno") || titleStr.includes("teknologi") || linkStr.includes("tech") || titleStr.includes("gadget")) {
          keyword = "technology,gadget,computer";
        } else if (linkStr.includes("ekonomi") || linkStr.includes("market") || linkStr.includes("bisnis") || linkStr.includes("investment") || linkStr.includes("finance")) {
          keyword = "business,finance,money";
        } else if (linkStr.includes("otomotif") || titleStr.includes("motor") || titleStr.includes("mobil")) {
          keyword = "car,automotive,vehicle";
        } else if (linkStr.includes("olahraga") || linkStr.includes("sport")) {
          keyword = "sports,athlete";
        } else if (linkStr.includes("hiburan") || linkStr.includes("entertainment") || linkStr.includes("lifestyle") || linkStr.includes("gaya-hidup")) {
          keyword = "entertainment,lifestyle,fashion";
        } else if (linkStr.includes("politik") || linkStr.includes("nasional")) {
          keyword = "politics,building,city";
        }
        
        imageUrl = `https://picsum.photos/seed/${keyword}-${index}/800/500`;
      }
      
      const cleanDesc = rawDesc.replace(/<[^>]+>/g, '').trim();
      
      return {
        id: `external-news-${index}`,
        url: article.link,
        title: article.title,
        content: cleanDesc || "Klik tautan ini untuk membaca kelanjutan berita selengkapnya di sumber asli.",
        imageUrl: imageUrl,
        createdAt: new Date(article.pubDate || Date.now()),
      };
    });
  } catch (error) {
    console.error("Gagal mengambil data dari API:", error);
    return [];
  }
}
