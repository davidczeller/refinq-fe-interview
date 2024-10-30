import Modal from "components/_common/Modal";
import { CommentsProps } from "./types";
import Loader from "components/_common/Loader";
import { useEffect } from "react";
import { useErrorModalStore } from "stores/useErrorModalStore";
import ErrorModal from "components/ErrorModal";

export default function Comments({ post, comments, isLoading, error, onClose }: CommentsProps) {
  const openErrorModal = useErrorModalStore(state => state.openErrorModal);

  // Show the error modal when an error occurs
  useEffect(() => {
    if (error) {
      openErrorModal(`An error has occurred: ${error.message || "Unknown Error"}`);
    }
  }, [error, openErrorModal]);

  return (
    <Modal onClose={onClose}>
      {/* Post Section */}
      <div className="w-1/2 px-4 my-4 border-r">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
      </div>

      {/* Comments Section */}
      <div className="w-1/2 px-4 my-4 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-2 sticky top-0 bg-white z-10">Comments</h3>
        {isLoading ? (
          <Loader />
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

      {/* Error Modal */}
      <ErrorModal />
    </Modal>
  );
}
