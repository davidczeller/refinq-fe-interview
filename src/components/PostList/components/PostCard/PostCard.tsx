import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Comment, PostCardProps } from "./types";

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", post.id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(res => res.json()),
    enabled: showComments,
  });

  const toggleComments = () => setShowComments(prev => !prev);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border relative">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>

      <button
        onClick={toggleComments}
        className="text-blue-500 hover:underline focus:outline-none mt-4 flex items-center"
      >
        {showComments ? "Hide Comments" : "See Comments"}
        <span className={`ml-1 transform transition-transform ${showComments ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>

      {showComments && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-gray-400">Loading comments...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load comments</p>
          ) : (
            <ul className="space-y-2">
              {comments?.map(comment => (
                <li key={comment.id} className="p-2 border-t">
                  <p className="text-gray-700 font-semibold">{comment.name}</p>
                  <p className="text-gray-500">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
