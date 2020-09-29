import React, { useState } from 'react';

import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import {
  CorrectAnswerObject,
  QuestionDifficulty,
  QuestionState
} from './questionTypes/questionTypes';

import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userCorrectAnswers, setUserCorrectAnswers] = useState<
    CorrectAnswerObject[]
  >([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [error, setError] = useState('');

  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        QuestionDifficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserCorrectAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1);

      const correctAnswerObj: CorrectAnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserCorrectAnswers(prev => [...prev, correctAnswerObj]);
    }
  };

  const nextQuestion = () => {
    // move on the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quizz</h1>
        {gameOver || userCorrectAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className='score'>Score: {score}</p> : null}

        {loading ? <p>Loading Questions...</p> : null}

        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userCorrectAnswer={
              userCorrectAnswers ? userCorrectAnswers[number] : null
            }
            callback={checkAnswer}
          />
        ) : null}

        {!gameOver &&
        !loading &&
        userCorrectAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {error && <p>{error}</p>}
      </Wrapper>
    </>
  );
};

export default App;
