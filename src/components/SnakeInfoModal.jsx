import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import SnakeInfo from "./SnakeInfo";

export default function SnakeInfoModal({ show, onClose, snake }) {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <SnakeInfo snake={snake}></SnakeInfo>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
