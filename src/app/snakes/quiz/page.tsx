"use client";

import React, { useState, useEffect } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import SnakeInfoModal from "../../../components/SnakeInfoModal";
import ScoreBoard from "../../../components/ScoreBoard";
import ListItem from "../../../components/ListItem";

import pack from "../../../data/pack/basic.json";
import snakeData from "../../../data/snake/snake_vietnam.json";

import { createQuiz } from "../../../utils/createQuiz";

const quizData = createQuiz(pack["species"], 30);

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === quizData.length - 1) {
      setShowScoreBoard(true); // Show scoreboard on the last question
    } else {
      setSelectedAnswer("");
      setShowResult(false);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleModalSpecies = (species) => {
    setModalSpecies(species);
  };

  const currentQuizItem = quizData[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">
        Snake Identification Quiz
      </h1>
      <div className="my-6 text-center">
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {quizData.length}
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="relative w-full h-72 mb-6">
        <Image
          src={currentQuizItem.image}
          alt="Snake"
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
          slides={[{ src: currentQuizItem.image }]}
          // plugins={[Fullscreen, Thumbnails, Zoom]}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {currentQuizItem.options.map((option, index) => (
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
                  option === currentQuizItem.correctAnswer && showResult,
                // Highlight selected incorrect answer
                "bg-red-500 text-white":
                  selectedAnswer === option &&
                  selectedAnswer !== currentQuizItem.correctAnswer &&
                  showResult,
              }
            )}
            disabled={showResult} // Disable button after selection
          >
            <span className="text-xl font-bold">
              {snakeData[option]["vietnamese_name"]}
            </span>
            <span className="text-sm text-gray-700 mt-2">toxicity</span>
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mb-6">
          <p
            className={`text-2xl font-semibold text-center ${
              selectedAnswer === currentQuizItem.correctAnswer
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {selectedAnswer === currentQuizItem.correctAnswer ? (
              <>
                Correct! <span className="text-3xl">✔️</span>
              </>
            ) : (
              <>
                Incorrect! <span className="text-3xl">❌</span>
              </>
            )}
          </p>
          <button
            onClick={() => {
              setModalSpecies(snakeData[selectedAnswer]);
              setShowModal(true);
            }}
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Learn more about this snake
          </button>
        </div>
      )}
      <div className="text-center">
        <button
          onClick={handleNextQuestion}
          className={`p-3 rounded-lg shadow-md transition ${
            selectedAnswer
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-800 cursor-not-allowed"
          }`}
          disabled={!selectedAnswer}
        >
          {currentQuestion === quizData.length - 1 && selectedAnswer
            ? "Show Score"
            : "Next Question"}
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
      <div className="mt-10 text-4xl font-bold mb-6 text-green-700 text-center">
        Species in this pack
      </div>
      <div className="text-center mb-5">{pack.species.length} species</div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pack["species"].map((species) => (
          <div
            key={snakeData[species].scientific_name}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => {
                setModalSpecies(snakeData[species]);
                setShowModal(true);
              }}
            >
              <div className="relative w-full h-32 mb-2">
                <Image
                  src={snakeData[species].thumbnail}
                  alt={snakeData[species].vietnamese_name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <h2 className="text-xl font-semibold">
                {snakeData[species].vietnamese_name}
              </h2>
              <p className="italic">{snakeData[species].scientific_name}</p>
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
            setCurrentQuestion(0);
            setScore(0);
            setShowScoreBoard(false);
            setSelectedAnswer("");
            setShowResult(false);
          }}
        />
      )}
    </div>
  );
}
