import { useState } from "react";
import { PostCardProps } from "./types";
import Comments from "./components/Comments";

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => setShowComments(prev => !prev);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border relative">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={toggleComments}
          className="text-black font-bold hover:text-[#00d47fd4] focus:outline-none mt-4"
        >
          {showComments ? "Hide Comments" : "See Comments"}
        </button>
      </div>

      {showComments && <Comments post={post} onClose={toggleComments} />}
    </div>
  );
}
