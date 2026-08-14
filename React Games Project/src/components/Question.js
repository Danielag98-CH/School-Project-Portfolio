import { useState } from "react"
import Button from "./Button"


const Question = ({question, onAnswerSubmitted}) => {

    const [answer, setAnswer] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAnswerSubmitted(answer);
        setAnswer("");
    }

  return (
    <div>
        <p>{question.questionText}</p>
        <form>
            <input 
                type= "text"
                placeholder= "Enter your answer here"
                value= {answer} 
                onChange= {(evt) => setAnswer(evt.target.value) }/>
                <Button label= "Submit Answer" 
                onButtonClick= {handleSubmit} />
        </form>
        {/* {console.log("render...", answer)} */}
    </div>
  )
}

export default Question