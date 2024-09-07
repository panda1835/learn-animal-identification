"use client";
import React from "react";

export default function ScoreBoard({ score, totalQuestions, onRestart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Điểm của bạn</h2>
        <p className="text-2xl mb-6">
          {score} / {totalQuestions}
        </p>
        <button
          onClick={onRestart}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Làm lại
        </button>
      </div>
    </div>
  );
}
