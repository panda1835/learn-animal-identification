"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gray-100 rounded-lg ">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primaryColorBear mb-4">
          Chào mừng đến với Quiz Nhận diện Gấu
        </h1>
        <p className="text-lg text-gray-700">
          Kiểm tra kiến thức của bạn và học thêm về các loài gấu khác nhau.
        </p>
      </header>
      <div className="relative w-full h-80 mb-8">
        <Image
          src="https://cdnmedia.baotintuc.vn/Upload/DmtgOUlHWBO5POIHzIwr1A/files/2024/02/07/gau-ngua-0702202-01.jpg"
          alt="Gấu ngựa"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primaryColorBear mb-4">
          Tại sao việc Nhận diện Gấu lại Quan trọng
        </h2>
        <p className="text-gray-700 text-lg">
          Hiểu cách nhận diện các loài gấu khác nhau rất quan trọng cho cả sự an
          toàn và nỗ lực bảo tồn. Cho dù bạn là người đi bộ đường dài, làm việc
          ngoài trời hay chỉ tò mò, quiz này sẽ giúp bạn nhận ra các loài gấu mà
          bạn có thể gặp phải.
        </p>
      </section>
      <section className="text-center">
        <Link href="/bears/quiz">
          <button className="bg-primaryColorBear-light text-white px-6 py-3 rounded-lg shadow-md hover:bg-primaryColor transition text-xl font-semibold">
            Bắt đầu Quiz
          </button>
        </Link>
      </section>
    </div>
  );
}
