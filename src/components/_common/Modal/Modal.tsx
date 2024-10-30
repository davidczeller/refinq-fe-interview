import { ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    // Lock scrolling on the body when the modal is open
    document.body.classList.add("no-scroll");

    // Clean up the scroll lock on modal close
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
        {children}
      </div>
    </div>
  );
}
