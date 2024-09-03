// app/snake/[id]/page.js
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import SnakeInfo from "../../../components/SnakeInfo";

import snakesData from "../../../data/snake/snake_vietnam.json";

export default async function SnakeProfile({ params: { id } }) {
  const decodedId = decodeURIComponent(id);
  const snake = snakesData[decodedId];

  if (!snake) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <SnakeInfo snake={snake}></SnakeInfo>
    </div>
  );
}
