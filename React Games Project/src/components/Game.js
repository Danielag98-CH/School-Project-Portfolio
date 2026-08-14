import { useState } from "react"
import Question from "./Question";


const Game = ({gameName, questions}) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleQuestionsSubmit = (answerGiven) => {
        if(answerGiven.toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()){
            // setScore(score + 1)
            setScore(prev => prev + 1);

        }

        if(currentQuestionIndex < questions.length - 1){
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }else{
            setGameOver(true);
        }
    }

    return (
    <div>
        <h1>{gameName}</h1>
        {
            gameOver ? 
                <h2>Game Over</h2> :
                    <> 
                        <h4>Question {currentQuestionIndex + 1}</h4>
                        <Question
                            question= {questions[currentQuestionIndex]}
                            onAnswerSubmitted= {handleQuestionsSubmit} /> 
                    </>
        }
        <h2>Your Score: {score}</h2>
    </div>
  )
}

export default Game