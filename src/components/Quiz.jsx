import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Questiontimer from "./Questiontimer";

export default function Quiz() {

  const [answerState,setAnswerState] = useState('')
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = answerState==='' ? userAnswers.length : userAnswers.length-1;

  const quizIsComplete = activeQuestionIndex===QUESTIONS.length

  const onAnswerHandler = useCallback((selectedAnswer) => {
    setAnswerState('answered')
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
    setTimeout(() => {
      if(selectedAnswer===QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct')
      }
      else{
        setAnswerState('wrong')
      }
      setTimeout(() => {
        setAnswerState('')
      }, 2000);
    }, 1000);
  },[activeQuestionIndex])

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
          {shuffledAnswers.map((answer) => {

            let cssClass = '';
            const isSelected = userAnswers[userAnswers.length - 1] === answer
            if(answerState==='answered' && isSelected){
              cssClass='selected';
            }
            if((answerState==='correct' || answerState==='wrong')&&isSelected){
              cssClass = answerState;
            }

            return(
              <li key={answer} className="answer">
              <button
                onClick={() => {
                  onAnswerHandler(answer);
                }}
                className={cssClass}
              >
                {answer}
              </button>
            </li>
            )
              })}
        </ul>
      </div>
    </div>
  );
}