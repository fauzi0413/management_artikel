import { getLastPost } from "@/lib/api";
import PostList from "@/components/PostList";

export default async function Home() {
  const lastPost = await getLastPost();
  return (
    <div className="main-heading">
      <h1>Selamat Datang di NextJS News</h1>
      <p className="subtitle">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, ut aut? Delectus dolor distinctio itaque necessitatibus quasi commodi sit beatae.</p>
      <PostList posts={lastPost} />      
    </div>
  );
}
