"use client";

import React, { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "../globals.css";
import Image from "next/image";
import clsx from "clsx";

import BearInfoModal from "../components/BearInfoModal";
import ScoreBoard from "../../../components/ScoreBoard";

import bearData from "../../../data/bear/bear.json";
import bearImage from "../../../data/bear/bear_inat_image.json";

import { createQuiz } from "../../../utils/createQuiz";
import { config } from "../../../utils/config";
import BearInfo from "../components/BearInfo";

export default function QuizPage({
  searchParams,
}: {
  searchParams?: {
    numQuestions?: number;
  };
}) {
  const numQuestion =
    Number(searchParams?.numQuestions) || config.defaultNumberOfBearQuestions;

  const speciesList = [];
  for (const key in bearData) {
    speciesList.push(key);
  }

  const quizData = createQuiz(speciesList, bearImage, numQuestion);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(quizData[0]);
  const [modalSpecies, setModalSpecies] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    }
  };

  console.log(currentQuestion);

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-center">Bear Identification Quiz</h1>
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
      <div className="relative w-full h-72 mb-6">
        <Image
          unoptimized
          src={currentQuestion.image}
          alt="Ảnh một bạn gấu"
          fill
          style={{ objectFit: "contain" }}
          className="rounded-lg shadow-md"
          onClick={() => {
            setLightboxOpen(true);
          }}
        />

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: currentQuestion.image }]}
          // plugins={[Fullscreen, Thumbnails, Zoom]}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={clsx(
              "p-4 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center justify-center",
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
              {bearData[option]["vietnamese_name"]}
            </span>
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mb-6">
          <button
            onClick={() => {
              setModalSpecies(bearData[currentQuestion.correctAnswer]);
              setShowModal(true);
            }}
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Cùng tìm hiểu thêm về bạn gấu này nhé!
          </button>
        </div>
      )}
      <div className="text-center">
        <button
          onClick={handleNextQuestion}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedAnswer
              ? "bg-primaryColorBear-light text-white hover:bg-primaryColor"
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
        <BearInfoModal
          show={showModal}
          onClose={() => setShowModal(false)}
          bear={modalSpecies}
        />
      </div>

      {/* Species list */}

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {speciesList.map((species) => (
          <div
            key={bearData[species].scientific_name}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <button
              onClick={() => {
                setModalSpecies(bearData[species]);
                setShowModal(true);
              }}
            >
              <div className="relative w-full h-32 mb-2">
                <Image
                  unoptimized
                  src={bearData[species].thumbnail}
                  alt={bearData[species].vietnamese_name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <p className="text-xl font-semibold">
                {bearData[species].vietnamese_name}
              </p>
              <p className="italic">{bearData[species].scientific_name}</p>
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
