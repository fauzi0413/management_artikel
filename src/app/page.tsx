import { getLastPost } from "@/lib/api";
import PostList from "@/components/PostList";

export default async function Home() {
  const lastPost = await getLastPost();
  return (
    <div className="main-heading">
      <h1>Welcome to NextJS News</h1>
      <p className="subtitle">
        Explore articles created by our community, learn new technologies, and stay updated with the latest trends in software development.
      </p>
      <PostList posts={lastPost} />      
    </div>
  );
}
