import { useEffect } from "react";
import { CommentsProps } from "./types";


export default function Comments({ post, comments, isLoading, error, onClose }: CommentsProps) {
  useEffect(() => {
    // Add the no-scroll class to body when the component mounts
    document.body.classList.add("no-scroll");

    // Clean up by removing the no-scroll class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white w-3/4 h-3/4 rounded-lg flex overflow-hidden relative" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-20 focus:outline-none"
        >
          &times;
        </button>

        {/* Post Section */}
        <div className="w-1/2 px-4 my-4 border-r">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>

        {/* Comments Section */}
        <div className="w-1/2 px-4 my-4 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2 sticky top-0 bg-white z-10">Comments</h3>
          {isLoading ? (
            <p className="text-gray-400">Loading comments...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load comments</p>
          ) : (
            <ul className="space-y-2 pb-4">
              {comments?.map(comment => (
                <li key={comment.id} className="p-2 border-b">
                  <p className="text-gray-700 font-semibold">{comment.name}</p>
                  <p className="text-gray-500">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
