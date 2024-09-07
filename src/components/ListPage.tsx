"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ViewGridIcon, TableIcon } from "@heroicons/react/outline";

import ListItem from "./ListItem";

const ListPage = ({ snakeList }) => {
  const [viewMode, setViewMode] = useState("gallery");

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode("gallery")}
          className={`mr-2 p-2 rounded ${
            viewMode === "gallery"
              ? "bg-primaryColor text-white"
              : "bg-gray-200"
          }`}
        >
          <ViewGridIcon className="h-5 w-5 mr-1" />
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`p-2 rounded ${
            viewMode === "table" ? "bg-primaryColor text-white" : "bg-gray-200"
          }`}
        >
          <TableIcon className="h-5 w-5 mr-1" />
        </button>
      </div>

      {viewMode === "gallery" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(snakeList).map((key) => {
            const snake = snakeList[key];
            return <ListItem snake={snake} key={snake.scientific_name} />;
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed md:table-auto">
            {" "}
            {/* Use table-fixed for wider screens, table-auto for md and smaller */}
            <thead>
              <tr>
                <th className="px-4 py-2 hidden md:table-cell">Ảnh</th>{" "}
                {/* Hide on md and smaller */}
                <th className="px-4 py-2 hidden md:table-cell">
                  Tên thường gọi
                </th>
                <th className="px-4 py-2 hidden md:table-cell">Tên khoa học</th>
                <th className="px-4 py-2 hidden md:table-cell">Tên khác</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(snakeList).map((key) => {
                const snake = snakeList[key];
                return (
                  <tr key={snake.id} className="flex flex-col md:table-row">
                    {" "}
                    {/* Column layout on md and smaller, table-row on larger */}
                    <td className="px-4 py-2 border rounded w-full md:w-auto">
                      <div className="flex flex-row items-center">
                        <Link href={`/snakes/${snake.scientific_name}`}>
                          <Image
                            src={snake.thumbnail}
                            alt={snake.vietnamese_name}
                            height={128} // Smaller image on all screens
                            width={128}
                            style={{ objectFit: "cover" }}
                          />
                        </Link>
                        <div className="ml-5 flex flex-col md:hidden">
                          {" "}
                          {/* Add margin on larger screens */}
                          <p className="font-bold">Tên thường gọi:</p>
                          <p>{snake.vietnamese_name}</p>
                          <p className="font-bold">Tên khoa học:</p>
                          <p className="italic">{snake.scientific_name}</p>
                          <p className="font-bold">Tên khác:</p>
                          <p>{snake.other_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border hidden md:table-cell">
                      {snake.vietnamese_name}
                    </td>{" "}
                    {/* Hide on md and smaller */}
                    <td className="px-4 py-2 italic border hidden md:table-cell">
                      {snake.scientific_name}
                    </td>
                    <td className="px-4 py-2 border hidden md:table-cell">
                      {snake.other_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListPage;
