"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";

import snakeImage from "../data/snake/snake_inat_image.json";

export default function SnakeInfo(props) {
  const { snake } = props;
  const images = snakeImage[snake.scientific_name]["image_urls"];
  // Get only 10 images
  const imagesSlice = images.slice(0, 10);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{snake.vietnamese_name}</h1>

      {/* Image Slider */}
      <div className="relative w-full h-64 mb-4 overflow-x-auto">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-64">
              <Image
                src={image}
                alt={snake.vietnamese_name}
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
        <p className="text-xl italic mb-2">{snake.scientific_name}</p>
        <p className="mb-2">{snake.description || ""}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Tên gọi khác</h2>
        <p>{snake.other_name !== "" ? snake.other_name : "Update later"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Độc tính</h2>
        <p>{snake.venomous ? snake.venomous : "Update later"}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Tình trạng bảo tồn</h2>
        <p>{snake.conservation_status}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Phân bố</h2>
        <p>{snake.distribution}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Wikipedia</h2>
        <a href={snake.wikipedia_url} className="text-blue-600 mb-5">
          {snake.wikipedia_url}
        </a>
      </div>
    </>
  );
}
