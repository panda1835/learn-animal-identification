"use client";
import Image from "next/image";

export default function SnakeInfo(props) {
  const { snake } = props;
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{snake.vietnamese_name}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={snake.thumbnail}
          alt={snake.vietnamese_name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded"
        />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl italic mb-2">{snake.scientific_name}</p>
        <p className="mb-2">{snake.description || ""}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Venomous</h2>
        <p>{snake.venomous ? snake.venomous : "Update later"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          Conservation Status
        </h2>
        <p>{snake.conservation_status}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Distribution</h2>
        <p>{snake.distribution}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Wikipedia</h2>
        <a href={snake.wikipedia_url} className="text-blue-600">
          {snake.wikipedia_url}
        </a>
      </div>
    </>
  );
}
