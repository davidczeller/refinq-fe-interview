import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

import Loader from "components/_common/Loader";
import ErrorModal from "components/ErrorModal";

import PostCard from "./components/PostCard";

import { Post } from "./types";
import { useErrorModalStore } from "stores/useErrorModalStore";

export default function PostList() {
  const openErrorModal = useErrorModalStore(state => state.openErrorModal);

  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
  });

  // Show the error modal when an error occurs
  useEffect(() => {
    if (error) {
      openErrorModal(`An error has occurred: ${error.message || "Unknown Error"}`);
    }
  }, [error, openErrorModal]);

  if (isLoading)
    return (
      <div className="text-center text-gray-600 h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {/* Error Modal */}
      <ErrorModal />
    </div>
  );
}
