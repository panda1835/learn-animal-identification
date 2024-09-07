// app/snake/[id]/page.js
import React from "react";
import { notFound } from "next/navigation";

import BearInfo from "../components/BearInfo";

import bearData from "../../../data/bear/bear.json";

export default async function BearProfile({ params: { id } }) {
  const decodedId = decodeURIComponent(id);
  const bear = bearData[decodedId];

  if (!bear) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <BearInfo bear={bear}></BearInfo>
    </div>
  );
}
