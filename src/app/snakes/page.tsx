// app/snakes/page.js
"use client"; // Indicate this is a Client Component

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import snakesData from "../../data/snake/snake_vietnam.json";

export default function SnakeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSnakes, setFilteredSnakes] = useState(
    snakesData as Record<string, any>
  );

  const handleSearch = (event: { target: { value: string } }) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = Object.keys(snakesData)
      .filter((key) => {
        const snake = snakesData[key];
        return (
          snake.vietnamese_name.toLowerCase().includes(query) ||
          snake.scientific_name.toLowerCase().includes(query) ||
          snake.distribution.toLowerCase().includes(query)
        );
      })
      .reduce((obj, key) => {
        obj[key] = snakesData[key];
        return obj;
      }, {});

    setFilteredSnakes(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Snake List</h1>

      {/* Search bar */}
      <div className="relative mb-5">
        {" "}
        {/* Wrap the input and button in a relative container */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Vietnamese or Scientific Name"
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(filteredSnakes).map((key) => {
          const snake = filteredSnakes[key];
          return (
            <Link
              key={snake.scientific_name}
              href={`/snakes/${encodeURIComponent(snake.scientific_name)}`} // Encode the scientific name for URL safety
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-32 mb-2">
                <Image
                  src={snake.thumbnail}
                  alt={snake.vietnamese_name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <h2 className="text-xl font-semibold">{snake.vietnamese_name}</h2>
              <p className="italic">{snake.scientific_name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
