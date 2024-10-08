import React from "react";
import { createPortal } from "react-dom";

import BearInfo from "./BearInfo";

export default function SnakeInfoModal({ show, onClose, bear }) {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-[500px] relative border border-gray-300 overflow-y-auto">
        <BearInfo bear={bear}></BearInfo>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}
