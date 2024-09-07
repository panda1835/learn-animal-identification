import Link from "next/link";
import "./globals.css";
import React, { ReactNode } from "react";

import "@fontsource/roboto-flex";

export const metadata = {
  title: "Nhận diện động vật",
  description: "Học cách nhận diện các loài động vật",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./turtle.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 font-roboto-flex flex flex-col">
        {/* Improved Navigation */}
        <header className="bg-primaryColorHome p-4 shadow-md"></header>

        {/* Main Content Area */}
        <main className="container mx-auto p-4 mt-8 flex-grow">{children}</main>

        {/* Optional Footer - positioned at the bottom */}
        <footer className="bg-gray-200 p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Website Nhận Diện Động Vật</p>
        </footer>
      </body>
    </html>
  );
}
