import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function SnakeInfoModal({ show, onClose, snake }) {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h1 className="text-3xl font-bold mb-4">{snake.name}</h1>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={snake.image}
            alt={snake.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className="bg-white p-4">
          <p className="text-xl italic mb-2">{snake.scientificName}</p>
          <p className="mb-2">{snake.description}</p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Habitat</h2>
          <p>{snake.habitat}</p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Diet</h2>
          <p>{snake.diet}</p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Venomous</h2>
          <p>{snake.venomous ? "Yes" : "No"}</p>
        </div>
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
