export function createQuiz(speciesList, speciesImage, numQuiz) {
  const quizData = [];

  for (let i = 0; i < numQuiz; i++) {
    const species = speciesList[Math.floor(Math.random() * speciesList.length)];
    const images = speciesImage[species]["image_urls"];
    const options = [species];

    while (options.length < 4) {
      const randomSnake =
        speciesList[Math.floor(Math.random() * speciesList.length)];
      if (!options.includes(randomSnake)) {
        options.push(randomSnake);
      }
    }
    quizData.push({
      image: images[Math.floor(Math.random() * images.length)],
      correctAnswer: species,
      options: options.sort(() => Math.random() - 0.5),
    });
  }

  return quizData;
}
