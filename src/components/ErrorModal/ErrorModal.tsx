import { useErrorModalStore } from "stores/useErrorModalStore";
import Modal from "components/_common/Modal";

export default function ErrorModal() {
  const { isOpen, message, closeErrorModal } = useErrorModalStore();

  if (!isOpen) return null;

  return (
    <Modal onClose={closeErrorModal}>
      <div className="flex flex-col items-center justify-center p-8 text-center w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-800 mb-6 max-w-md">{message}</p>
        <button
          onClick={closeErrorModal}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 focus:outline-none"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
