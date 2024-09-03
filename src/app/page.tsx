"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gray-100 rounded-lg ">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          Welcome to the Snake Identification Quiz
        </h1>
        <p className="text-lg text-gray-700">
          Test your knowledge and learn more about different species of snakes.
        </p>
      </header>
      <div className="relative w-full h-80 mb-8">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1d6oaUpJaf609hu1Ruk-KfyC_oKm8Tducn2OoFfPPrXqXUgFS"
          alt="Cobra in Forest"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Why Snake Identification Matters
        </h2>
        <p className="text-gray-700 text-lg">
          Understanding how to identify different snake species is crucial for
          both safety and conservation efforts. Whether you&apos;re a hiker,
          gardener, or just curious, this quiz will help you recognize the
          snakes you may encounter.
        </p>
      </section>
      <section className="text-center">
        <Link href="/snakes/quiz">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition text-xl font-semibold">
            Start the Quiz
          </button>
        </Link>
      </section>
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2024 Snake Identification Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}
