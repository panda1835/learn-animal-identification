import snakeData from "../data/snake/snake_vietnam.json";

export function createQuiz(snakeList, numQuiz) {
  const quizData = [];

  for (let i = 0; i < numQuiz; i++) {
    const snake = snakeList[Math.floor(Math.random() * snakeList.length)];
    const options = [snake];

    while (options.length < 4) {
      const randomSnake =
        snakeList[Math.floor(Math.random() * snakeList.length)];
      if (!options.includes(randomSnake)) {
        options.push(randomSnake);
      }
    }
    quizData.push({
      image: snakeData[snake]["thumbnail"],
      correctAnswer: snake,
      options: options.sort(() => Math.random() - 0.5),
    });
  }

  return quizData;
}
