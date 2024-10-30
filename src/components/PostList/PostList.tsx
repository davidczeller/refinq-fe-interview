import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "components/_common/Loader";
import ErrorModal from "components/ErrorModal";
import PostCard from "./components/PostCard";
import { Post } from "./types";
import { useErrorModalStore } from "stores/useErrorModalStore";

export default function PostList() {
  const openErrorModal = useErrorModalStore(state => state.openErrorModal);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("A-Z"); // Default to A-Z
  const [commentSortOrder, setCommentSortOrder] = useState("asc"); // Default to ascending
  const [searchScope, setSearchScope] = useState("both"); // Default to both title and body
  const [showFilters, setShowFilters] = useState(false); // Toggle for filter options visibility

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

  // Filter posts based on search query and search scope
  const filteredPosts = data?.filter(post => {
    const query = searchQuery.toLowerCase();
    if (searchScope === "title") {
      return post.title.toLowerCase().includes(query);
    } else if (searchScope === "body") {
      return post.body.toLowerCase().includes(query);
    }
    return post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query);
  });

  // Sort posts based on selected sorting option and comment count order
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

  if (isLoading)
    return (
      <div className="text-center text-gray-600 h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>

      {/* Toggle Button for Search and Filter Options */}
      <div className="text-right mb-4">
        <button
          onClick={() => setShowFilters(prev => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition duration-200"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Animated Search and Filter Options */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* Search Scope Toggle */}
          <div className="flex items-center space-x-4">
            <label>Search In:</label>
            <select
              value={searchScope}
              onChange={e => setSearchScope(e.target.value)}
              className="border p-2 rounded focus:outline-none"
            >
              <option value="title">Title</option>
              <option value="body">Body</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Sorting Options */}
          <div className="flex items-center space-x-4">
            <label>Sort By:</label>
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="border p-2 rounded focus:outline-none"
            >
              <option value="A-Z">Title: A-Z</option>
              <option value="Z-A">Title: Z-A</option>
              <option value="comments">Comment Count</option>
            </select>

            {/* Comment Sort Order */}
            {sortOption === "comments" && (
              <select
                value={commentSortOrder}
                onChange={e => setCommentSortOrder(e.target.value)}
                className="border p-2 rounded focus:outline-none"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Error Modal */}
      <ErrorModal />
    </div>
  );
}
