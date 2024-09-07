"use client"; // Indicate this is a Client Component

import React, { useState } from "react";

import ListPage from "../components/ListPage";

import bearData from "../../../data/bear/bear.json";

export default function SnakeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSnakes, setFilteredSnakes] = useState(
    bearData as Record<string, any>
  );

  const handleSearch = (event: { target: { value: string } }) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = Object.keys(bearData)
      .filter((key) => {
        const snake = bearData[key];
        return (
          snake.vietnamese_name.toLowerCase().includes(query) ||
          snake.scientific_name.toLowerCase().includes(query) ||
          snake.other_name.toLowerCase().includes(query)
          // snake.distribution.toLowerCase().includes(query)
        );
      })
      .reduce((obj, key) => {
        obj[key] = bearData[key];
        return obj;
      }, {});

    setFilteredSnakes(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Danh sách loài</h1>

      {/* Search bar */}
      <div className="relative mb-5">
        {" "}
        {/* Wrap the input and button in a relative container */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm bằng tên thường gọi hoặc tên khoa học"
          className="w-full p-3 pl-10 pr-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <ListPage snakeList={filteredSnakes} />
    </div>
  );
}
