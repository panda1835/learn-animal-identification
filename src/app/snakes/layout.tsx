import Link from "next/link";
import "./globals.css";
import React, { ReactNode } from "react";

import "@fontsource/roboto-flex";

import Navigation from "../../components/Navigation";

export const metadata = {
  title: "Nhận diện Rắn 🐍",
  description: "Học cách nhận diện các loài rắn khác nhau",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./snake.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 font-roboto-flex flex flex-col">
        {/* Improved Navigation */}
        <header className="bg-primaryColorSnake-light shadow-md">
          <div className="container mx-auto flex justify-between items-center align-middle p-4">
            <h1 className="text-2xl font-semibold text-white items-center">
              <Link href="/snakes" className="items-center">
                Nhận diện rắn
              </Link>
            </h1>
            <Navigation
              items={[
                { href: "/", label: "Trang chủ" },
                { href: "/snakes/quiz", label: "Học" },
                { href: "/snakes/list", label: "Danh sách loài" },
              ]}
            />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto p-4 mt-8 flex-grow">{children}</main>
      </body>
    </html>
  );
}
