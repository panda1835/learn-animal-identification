"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../globals.css";

import bearImage from "../../../data/bear/bear_inat_image.json";

export default function BearInfo({ bear }) {
  const images = bearImage[bear.scientific_name]["image_urls"];
  // Get only 10 images
  const imagesSlice = images.slice(0, 10);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        {bear.vietnamese_name} {bear.in_vietnam ? "🇻🇳" : ""}
      </h1>

      {/* Image Slider */}
      <div className="relative w-full h-64 mb-4 overflow-x-auto">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-64">
              <Image
                src={image}
                alt={bear.vietnamese_name}
                height={256} // Fixed height
                width={256} // Fixed width
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
                className="rounded-lg mx-2 cursor-pointer"
                onClick={() => {
                  setActiveImageIndex(index);
                  setLightboxOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for Zoom */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((image) => ({ src: image }))}
        index={activeImageIndex}
        // plugins={[Fullscreen, Thumbnails, Zoom]}
      />

      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl italic mb-2">{bear.scientific_name}</p>
        <p className="mb-2">{bear.description || ""}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Tên gọi khác</h2>
        <p>{bear.other_name !== "" ? bear.other_name : "Cập nhật sau"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Tên tiếng Anh</h2>
        <p>{bear.english_name}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Đặc điểm nhận dạng</h2>
        <p>
          {bear.identification !== "" ? bear.identification : "Cập nhật sau"}
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Phân bố</h2>
        <p>{bear.distribution !== "" ? bear.distribution : "Cập nhật sau"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Tình trạng bảo tồn</h2>
        <p>{bear.conservation_status}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Thông tin thú vị</h2>
        <p>{bear.fun_fact !== "" ? bear.fun_fact : "Cập nhật sau"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Wikipedia</h2>
        <a href={bear.wikipedia_url} className="text-blue-600 mb-5">
          {bear.wikipedia_url}
        </a>
      </div>
    </>
  );
}
