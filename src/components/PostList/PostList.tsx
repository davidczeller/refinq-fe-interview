import { useQuery } from "@tanstack/react-query";

import { Post } from "./types";
import PostCard from "./components/PostCard";
import Loader from "components/_common/Loader/Loader";

export default function PostList() {
  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-600 h-screen">
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500">An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
