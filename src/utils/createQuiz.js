import snakeData from "../data/snake/snake_vietnam.json";
import snakeImage from "../data/snake/snake_inat_image.json";

export function createQuiz(snakeList, numQuiz) {
  const quizData = [];

  for (let i = 0; i < numQuiz; i++) {
    const snake = snakeList[Math.floor(Math.random() * snakeList.length)];
    const images = snakeImage[snake]["image_urls"];
    const options = [snake];

    while (options.length < 4) {
      const randomSnake =
        snakeList[Math.floor(Math.random() * snakeList.length)];
      if (!options.includes(randomSnake)) {
        options.push(randomSnake);
      }
    }
    quizData.push({
      image: images[Math.floor(Math.random() * images.length)],
      correctAnswer: snake,
      options: options.sort(() => Math.random() - 0.5),
    });
  }

  return quizData;
}
