import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Comment, PostCardProps } from "./types";
import Comments from "./components/Comments";

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => setShowComments(prev => !prev);

  // Fetch comments with useQuery and get the length for display
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", post.id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(res => res.json()),
  });

  const buttonText = showComments
    ? "Hide Comments"
    : comments && comments.length > 1
    ? `See all ${comments.length} comments`
    : "See comment";

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border relative">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>

      <div className="absolute bottom-4 right-4">
        {comments && comments.length > 0 && (
          <button
            onClick={toggleComments}
            className="text-black font-bold hover:text-[#00d47fd4] focus:outline-none mt-4"
          >
            {buttonText}
          </button>
        )}
      </div>

      {showComments && (
        <Comments post={post} comments={comments} isLoading={isLoading} error={error} onClose={toggleComments} />
      )}
    </div>
  );
}
