// app/layout.js
import Link from "next/link";
import "./globals.css";
import React, { ReactNode } from "react";

import "@fontsource/roboto-flex";

export const metadata = {
  title: "Snake Identification App",
  description: "Learn to identify different snake species",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <nav className="bg-green-600 p-4 ">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:underline">
                Học
              </Link>
            </li>
            <li>
              <Link href="/snakes/list" className="text-white hover:underline">
                Danh sách loài
              </Link>
            </li>
          </ul>
        </nav>
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
