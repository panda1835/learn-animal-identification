"use client";

import React, { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import clsx from "clsx";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

import SnakeInfoModal from "../../../../components/SnakeInfoModal";
import ScoreBoard from "../../../../components/ScoreBoard";

import packData from "../../../../data/pack/pack.json";
import snakeData from "../../../../data/snake/snake_vietnam.json";
import snakeImage from "../../../../data/snake/snake_inat_image.json";

import { createImageSlides } from "../../../../utils/slides";
import { createQuiz } from "../../../../utils/createQuiz";
import { config } from "../../../../utils/config";
import Link from "next/link";

export default function QuizPage({
  params,
  searchParams,
}: {
  params: {
    packId: string;
  };
  searchParams?: {
    numQuestions?: number;
  };
}) {
  const packId = params.packId || "";
  const numQuestion =
    Number(searchParams?.numQuestions) || config.defaultNumberOfQuestions;

  const pack = packData[packId];

  const quizData = createQuiz(pack["species"], snakeImage, numQuestion);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(quizData[0]);
  const [modalSpecies, setModalSpecies] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState(
    createImageSlides([{ url: currentQuestion.image, width: 700, height: 500 }])
  );

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    // Update the score if the answer is correct
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      setShowScoreBoard(true); // Show scoreboard on the last question
    } else {
      setSelectedAnswer("");
      setShowResult(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestion(quizData[currentQuestionIndex]);
      setLightboxSlides(
        createImageSlides([
          {
            url: quizData[currentQuestionIndex].image,
            width: 700,
            height: 500,
          },
        ])
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans bg-gray-100 rounded-lg shadow-md">
      <h1 className=" text-center">Snake Identification Quiz</h1>
      <div className="my-6 text-center">
        <p className="text-gray-600">
          Câu hỏi {currentQuestionIndex + 1} / {quizData.length}
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="relative w-full h-72 mb-2">
        <Image
          unoptimized
          src={currentQuestion.image}
          alt="Ảnh một bạn rắn"
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg shadow-md hover:cursor-pointer"
          onClick={() => {
            setLightboxOpen(true);
          }}
        />

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          // plugins={[Fullscreen, Thumbnails, Zoom]}
          plugins={[Zoom]}
        />
      </div>
      <p className="mb-4 text-xs italic">
        {`Ảnh của ${"123"} trên `}
        <Link href="www.google.com" className="text-blue-500 underline">
          iNaturalist
        </Link>
      </p>
      <div className="grid grid-cols-2 gap-6 mb-6 relative">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={clsx(
              "w-full h-full p-4 rounded-lg shadow-md transition hover:scale-105 transform  flex flex-col items-center justify-center relative", // Set button to relative
              {
                // Default styling when no answer is selected
                "bg-yellow-500 text-gray-800 hover:bg-yellow-600":
                  !selectedAnswer,
                // Disabled styling when an answer is selected
                "bg-gray-300 text-gray-500 cursor-not-allowed": selectedAnswer,
                // Highlight correct answer
                "bg-green-500 text-white":
                  option === currentQuestion.correctAnswer && showResult,
                // Highlight selected incorrect answer
                "bg-red-500 text-white":
                  selectedAnswer === option &&
                  selectedAnswer !== currentQuestion.correctAnswer &&
                  showResult,
              }
            )}
            disabled={showResult} // Disable button after selection
          >
            <span className="text-xl font-bold">
              {snakeData[option]["vietnamese_name"]}
            </span>
            <p
              className={clsx("font-bold", {
                "text-green-700": snakeData[option]["harmless"], // Green for harmless
                "text-red-700": !snakeData[option]["harmless"], // Red for dangerous
              })}
            >
              {snakeData[option].harmless ? "Vô hại" : "Nguy hiểm"}
            </p>
            <span className="text-sm text-gray-700 mt-2">
              {snakeData[option]["other_name"]}
            </span>
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mb-6">
          <button
            onClick={() => {
              setModalSpecies(snakeData[currentQuestion.correctAnswer]);
              setShowModal(true);
            }}
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Cùng tìm hiểu thêm về bạn rắn này nhé!
          </button>
        </div>
      )}
      <div className="text-center">
        <button
          onClick={handleNextQuestion}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedAnswer
              ? "bg-primaryColorSnake-light text-white hover:bg-primaryColorSnake"
              : "bg-gray-400 text-gray-800 cursor-not-allowed"
          }`}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === quizData.length - 1 && selectedAnswer
            ? "Xem điểm"
            : "Câu hỏi tiếp theo"}
        </button>
      </div>
      <div className="mx-2">
        <SnakeInfoModal
          show={showModal}
          onClose={() => setShowModal(false)}
          snake={modalSpecies}
        />
      </div>

      {/* Species list */}
      <h1 className="mt-10  text-center">Các loài trong gói này</h1>
      <div className="text-center mb-5">{pack.species.length} loài</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pack["species"].map((species) => (
          <div
            key={snakeData[species].scientific_name}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <button
              onClick={() => {
                setModalSpecies(snakeData[species]);
                setShowModal(true);
              }}
            >
              <div className="relative w-full h-32 mb-2">
                <Image
                  unoptimized
                  src={snakeData[species].thumbnail}
                  alt={snakeData[species].vietnamese_name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <p className="text-xl font-semibold">
                {snakeData[species].vietnamese_name}
              </p>
              {snakeData[species]["harmless"] !== undefined && (
                <p
                  className={clsx("font-bold", {
                    "text-green-600": snakeData[species]["harmless"], // Green for harmless
                    "text-red-600": !snakeData[species]["harmless"], // Red for dangerous
                  })}
                >
                  {snakeData[species].harmless ? "Vô hại" : "Nguy hiểm"}
                </p>
              )}

              <p className="italic">{snakeData[species].scientific_name}</p>
              <p className="">{snakeData[species].other_name}</p>
            </button>
          </div>
        ))}
      </div>

      {/* Score board */}
      {showScoreBoard && (
        <ScoreBoard
          score={score}
          totalQuestions={quizData.length}
          onRestart={() => {
            // Refresh page
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
