import SampleComponent from './components/SampleComponent'
import Game from './components/Game'

const App = () => {

  const triviaQuestions = [
    {id: 1, questionText: "What color is the sky?", correctAnswer: "blue"},
    {id: 2, questionText: "Who wrote the Percy Jackson Series?", correctAnswer: "Rick Riordan"},
    {id: 3, questionText: "Who is the 'Boy who lived'?", correctAnswer: "Harry Potter"}
  ]

  return (
    <>
      <header>
        Header
      </header>
      <main>
        {/* <SampleComponent /> */}
        <Game 
          gameName= "Trivia Game"
          questions={triviaQuestions} />
      </main>
      <footer>
        Footer
      </footer>
    </>
  )
}

export default App