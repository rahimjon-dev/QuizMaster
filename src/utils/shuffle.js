/**
 * Fisher-Yates array shuffling algorithm
 * Shuffles an array randomly without mutating the original array
 */
export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Shuffles quiz question options across all languages (en, uz, ru)
 * while maintaining the correct answer reference index!
 * @param {Object} questionItem
 * @returns {Object} Transformed question with randomized options and updated correctAnswer
 */
export const shuffleQuestionOptions = (questionItem) => {
  const originalCorrectIndex = questionItem.correctAnswer;
  const optionsEn = questionItem.options.en;
  const optionsUz = questionItem.options.uz;
  const optionsRu = questionItem.options.ru;

  // Create an indexed map [0, 1, 2, 3] and shuffle the indices
  const indices = [0, 1, 2, 3].slice(0, optionsEn.length);
  const shuffledIndices = shuffleArray(indices);

  // Re-map options according to shuffled indices
  const newOptionsEn = shuffledIndices.map((idx) => optionsEn[idx]);
  const newOptionsUz = shuffledIndices.map((idx) => optionsUz[idx]);
  const newOptionsRu = shuffledIndices.map((idx) => optionsRu[idx]);

  // Find the new index of the correct answer
  const newCorrectIndex = shuffledIndices.indexOf(originalCorrectIndex);

  return {
    ...questionItem,
    options: {
      en: newOptionsEn,
      uz: newOptionsUz,
      ru: newOptionsRu,
    },
    correctAnswer: newCorrectIndex,
  };
};

/**
 * Prepares and randomizes a quiz session:
 * 1. Filters by difficulty (if requested)
 * 2. Shuffles questions
 * 3. Randomizes option positions for every question
 * 4. Takes requested count (e.g. 15 or 30)
 */
export const prepareQuizSession = (questions, difficulty = 'All', count = 15) => {
  let filtered = [...questions];

  if (difficulty && difficulty !== 'All') {
    const matched = filtered.filter(
      (q) => q.difficulty?.toLowerCase() === difficulty.toLowerCase()
    );
    if (matched.length >= count) {
      filtered = matched;
    } else if (matched.length > 0) {
      // If not enough exact match, prioritize matched then add others
      const others = filtered.filter(
        (q) => q.difficulty?.toLowerCase() !== difficulty.toLowerCase()
      );
      filtered = [...matched, ...shuffleArray(others)];
    }
  }

  // Shuffle questions array
  const randomizedQuestions = shuffleArray(filtered);

  // Take requested count
  const selectedQuestions = randomizedQuestions.slice(0, count);

  // Randomize options for each question so answers are never in the same position
  return selectedQuestions.map((q) => shuffleQuestionOptions(q));
};
