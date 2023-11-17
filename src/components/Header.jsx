import React from "react";
import quizLogoImage from "../assets/quiz-logo.png";
import "../index.css";

export default function Header() {
  return (
    <header>
      <img src={quizLogoImage} alt="quiz logo"></img>
      <h1>Quiz App</h1>
    </header>
  );
}
