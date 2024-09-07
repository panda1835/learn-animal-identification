"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gray-100 rounded-lg ">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primaryColorSnake mb-4">
          Chào mừng đến với Quiz Nhận diện Rắn
        </h1>
        <p className="text-lg text-gray-700">
          Kiểm tra kiến thức của bạn và học thêm về các loài rắn khác nhau.
        </p>
      </header>
      <div className="relative w-full h-80 mb-8">
        <Image
          src="https://images5.alphacoders.com/872/872097.jpg"
          alt="Rắn lục"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primaryColorSnake mb-4">
          Tại sao việc Nhận diện Rắn lại Quan trọng
        </h2>
        <p className="text-gray-700 text-lg">
          Hiểu cách nhận diện các loài rắn khác nhau rất quan trọng cho cả sự an
          toàn và nỗ lực bảo tồn. Cho dù bạn là người leo núi, làm vườn hay chỉ
          tò mò, quiz này sẽ giúp bạn nhận ra các loài rắn mà bạn có thể gặp
          phải.
        </p>
      </section>
      <section className="text-center">
        <Link href="/snakes/quiz">
          <button className="bg-primaryColorSnake-light text-white px-6 py-3 rounded-lg shadow-md hover:bg-primaryColor transition text-xl font-semibold">
            Bắt đầu Quiz
          </button>
        </Link>
      </section>
    </div>
  );
}
