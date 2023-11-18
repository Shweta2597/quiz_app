import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Questiontimer from "./Questiontimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex===QUESTIONS.length

  const onAnswerHandler = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  })

  const handleSkipAnswer = useCallback(()=>{onAnswerHandler(null)},
  [onAnswerHandler])

  if(quizIsComplete){
    return (
        <div id="summary">
            <img src={quizCompleteImage} alt="Trophy image"></img>
            <h2>Quiz Completed!</h2>
        </div>
    )
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(()=>Math.random()-0.5)

  return (
    <div id="quiz">
      <div id="question">
      <Questiontimer key ={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></Questiontimer>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => {
                  onAnswerHandler(answer);
                }}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
