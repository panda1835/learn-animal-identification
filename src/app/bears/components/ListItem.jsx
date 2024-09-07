import Image from "next/image";
import Link from "next/link";

export default function ListItem({ bear }) {
  return (
    <Link
      key={bear.scientific_name}
      href={`/bears/${encodeURIComponent(bear.scientific_name)}`} // Encode the scientific name for URL safety
    >
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow h-full">
        <div className="relative w-full h-32 mb-2">
          <Image
            src={bear.thumbnail}
            alt={bear.vietnamese_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className="text-xl font-semibold">
          {bear.vietnamese_name} {bear.in_vietnam ? "🇻🇳" : ""}
        </div>
        <p className="italic">{bear.scientific_name}</p>
      </div>
    </Link>
  );
}
