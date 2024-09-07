import Image from "next/image";
import Link from "next/link";

export default function ListItem({ snake }) {
  return (
    <Link
      key={snake.scientific_name}
      href={`/snakes/${encodeURIComponent(snake.scientific_name)}`} // Encode the scientific name for URL safety
    >
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow h-full">
        <div className="relative w-full h-32 mb-2">
          <Image
            src={snake.thumbnail}
            alt={snake.vietnamese_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className="text-xl font-semibold">{snake.vietnamese_name}</div>
        <p className="italic">{snake.scientific_name}</p>
        <p className="">{snake.other_name}</p>
      </div>
    </Link>
  );
}
