import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "components/_common/Loader";
import ErrorModal from "components/ErrorModal";
import PostCard from "./components/PostCard";
import { Post } from "./types";
import { useErrorModalStore } from "stores/useErrorModalStore";
import { usePostFilterStore } from "stores/usePostFilterStore";
import PostFilters from "./components/PostFilters";

export default function PostList() {
  const openErrorModal = useErrorModalStore(state => state.openErrorModal);
  const { searchQuery, sortOption, commentSortOrder, searchScope } = usePostFilterStore();

  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
  });

  useEffect(() => {
    if (error) {
      openErrorModal(`An error has occurred: ${error.message || "Unknown Error"}`);
    }
  }, [error, openErrorModal]);

  const filteredPosts = data?.filter(post => {
    const query = searchQuery.toLowerCase();
    if (searchScope === "title") {
      return post.title.toLowerCase().includes(query);
    } else if (searchScope === "body") {
      return post.body.toLowerCase().includes(query);
    }
    return post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query);
  });

  const sortedPosts = filteredPosts?.sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOption === "comments") {
      return commentSortOrder === "asc" ? a.commentCount - b.commentCount : b.commentCount - a.commentCount;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 sticky top-0 z-10 bg-white p-6 w-screen left-0">Posts</h1>
      <div className="container mx-auto p-4">
        {/* Post Filters */}
        <PostFilters />

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Error Modal */}
        {/*
         Should use portal (event bubbling),
         rendering should be checked on this level,
         not inside the modal comp.
        */}
        <ErrorModal />
      </div>
    </>
  );
}
