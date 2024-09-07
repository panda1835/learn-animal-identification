import Link from "next/link";
import "../globals.css";
import React, { ReactNode } from "react";

import "@fontsource/roboto-flex";

export const metadata = {
  title: "Nhận diện Gấu 🐻",
  description: "Học cách nhận diện các loài gấu khác nhau",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./bear.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 font-roboto-flex flex flex-col">
        {/* Improved Navigation */}
        <header className="bg-primaryColorBear-light p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center align-middle">
            <h1 className="text-2xl font-semibold text-white align-middle">
              <Link href="/bears">Nhận diện gấu</Link>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-white hover:underline text-lg">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bears/quiz"
                    className="text-white hover:underline text-lg"
                  >
                    Học
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bears/list"
                    className="text-white hover:underline text-lg"
                  >
                    Danh sách loài
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto p-4 mt-8 flex-grow">{children}</main>
      </body>
    </html>
  );
}
