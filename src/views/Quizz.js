import React from "react"
import {Helmet} from "react-helmet"
import "../scss/helpers/reset.scss"

const QuizzPage = (data) => (
  <div className="quizz">
      <Helmet>
        <html lang="en" />
        <title>Quiz Paul Santamaria</title>
        <meta name="description" content="Here is the quizz of Paul Santamaria" />
        <meta name="theme-color" content="#fff" /> 
    </Helmet>
      <p>quizz</p>
  </div>
)

export default QuizzPage