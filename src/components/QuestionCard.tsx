import React, { FC } from 'react';

import { CorrectAnswerObject } from '../questionTypes/questionTypes';

import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userCorrectAnswer: CorrectAnswerObject | null;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: FC<Props> = ({
  question,
  answers,
  callback,
  userCorrectAnswer,
  questionNr,
  totalQuestions
}) => {
  return (
    <Wrapper>
      <p className='number'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers?.map((answer, index) => (
          <ButtonWrapper
            correct={userCorrectAnswer?.correctAnswer === answer}
            userClicked={userCorrectAnswer?.answer === answer}
            key={index}
          >
            <button
              disabled={userCorrectAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
