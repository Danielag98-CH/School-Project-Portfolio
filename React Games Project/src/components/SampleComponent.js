
import logo from '../logo.svg'
import {useState} from 'react';
import Button from './Button'
import Question from './Question';

const SampleComponent = () => {

    // let imgWidth = 200;
    const [imgWidth, setImgWidth] = useState(100);

    const someFunction = () => {
        console.log("Button 3 click");
    }

    const questionObj = {id: 1, questionText: "What color is the sky?", correctAnswer: "blue"}

  return (
    <>
        <img src= {logo} width={imgWidth} alt="React Logo"/>
        {/* <button onClick={() => setImgWidth(imgWidth + 100)}>Button 1</button> */}
        <button onClick={() => setImgWidth(prev =>  prev + 100)}>Button 1</button>
        <Button label="Button 2" onButtonClick={() => console.log("click")} />
        <Button 
        label="Button 3" 
        onButtonClick={ someFunction } 
        isPromo="true"/>

        <Question 
          question={questionObj} 
          onAnswerSubmitted={ answerGiven => console.log(answerGiven) }/>
    </>
  )
}

export default SampleComponent