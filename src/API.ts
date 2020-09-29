import { shuffleArray } from './utils';
import { Question, QuestionDifficulty } from './questionTypes/questionTypes';

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: QuestionDifficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};
