import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import Loader from "components/_common/Loader";
import ErrorModal from "components/ErrorModal";

import PostCard from "./components/PostCard";

import { Post } from "./types";

export default function PostList() {
  const [showErrorModal, setShowErrorModal] = useState(true);
  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
  });

  const closeModal = () => setShowErrorModal(false);

  if (isLoading)
    return (
      <div className="text-center text-gray-600 h-screen">
        <Loader />
      </div>
    );

  if (showErrorModal && error) {
    return <ErrorModal message={`An error has occurred: ${error?.message || "Unknown Error"}`} onClose={closeModal} />;
  }

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
