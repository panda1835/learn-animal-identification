"use client";

import React, { useState } from "react";
import pack from "../../../data/pack/pack.json";
import snakeData from "../../../data/snake/snake_vietnam.json";
import Link from "next/link";

import { config } from "../../../utils/config";

const ListPack = () => {
  const [numQuestions, setNumQuestions] = useState({});

  const defaultNumQuestions = config.defaultNumberOfQuestions;
  const handleNumQuestionsChange = (key, event) => {
    setNumQuestions({
      ...numQuestions,
      [key]: event.target.value,
    });
  };

  const snakeListInPack = {};
  for (const [packKey, packValue] of Object.entries(pack)) {
    snakeListInPack[packKey] = packValue.species.map((speciesId) => {
      return snakeData[speciesId];
    });
  }

  console.log(snakeListInPack);
  return (
    <div>
      {/* List all packs */}
      <h1>Các gói học tập</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(pack).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-lg shadow transition-shadow h-full p-4"
          >
            <div>
              <p className="semibold text-2xl mb-2">{value.name}</p>
              <p>{value.short_description}</p>
              <p className="my-2">
                Số loài: {value.species.length}{" "}
                <Link
                  href={`/snakes/quiz/list/${key}`}
                  className="text-blue-500"
                >
                  (Xem danh sách)
                </Link>{" "}
              </p>
              <div className="mb-2">
                <p>
                  Số lượng câu hỏi:{""}
                  <input
                    type="number"
                    value={numQuestions[key] || defaultNumQuestions}
                    onChange={(event) => handleNumQuestionsChange(key, event)}
                    className="ml-2 w-16 p-1 border rounded"
                    min="1"
                  />
                </p>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/snakes/quiz/${key}?numQuestions=${
                    numQuestions[key] || defaultNumQuestions
                  }`}
                  key={key}
                >
                  <p className="inline-block rounded bg-green-700 p-2 text-white">
                    Bắt đầu học
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPack;
