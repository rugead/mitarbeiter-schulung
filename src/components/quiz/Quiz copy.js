import React, { useState }  from 'react';
import { useParams } from 'react-router';
import { dataSet} from "../data/"
import { QuizArea, ScoreArea } from './QuizFunctions';
// import { DialogOverlay } from '../DialogOverlay';
// import DialogConfirmNumber from '../DialogConfirmNumber'
import { H4} from '../Headline'

export const Quiz = (props) => {
  const { indexOfItem} = useParams()
   
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctScore, setCorrectScore] = useState(0)
  const [incorrectScore, setIncorrectScore] = useState(0)
  const [abc, setAbc] = useState()
  const [answerArr, setAnswerArr] = useState([])
  
  
  // const [dialogIsOpen, setDialogIsOpen] = useState(false)
  // const [dialogTitle, setDialogTitle] = useState('Error')
  // const [dialogDescription, setDialogDescription] = useState('unknown error')
  // const [dialogButtonText, setDialogButtonText] = useState('cancel')
  // const [dialogConfIsOpen, setDialogConfIsOpen] = useState(false)
  // const [personalnummer, setPersonalnummer] = useState(0)
  
  const title = dataSet[indexOfItem].title
  const questions = dataSet[indexOfItem].questions
  const question = questions[currentQuestion]
  // console.log('question: ', question);
  
   console.log('ans: ', answerArr, 'current: ', currentQuestion,  'QuestionLength: ', questions.length, 'false: ', incorrectScore, 'true: ', correctScore);


  const renderTitle= Object.entries(title).map(([key, value]) => {
    return (value)
  })

  // const submitConfirmation = () => {
  //   console.log('personalnummer: ', personalnummer);
  //   // setDialogConfIsOpen(false)
  // }
  
  // const onChangeHandler = (ev) => {
  //   ev.preventDefault()
  //   const { name, value } = ev.currentTarget  
  //   if (name === 'personalnummer') {
  //     setPersonalnummer(value)
  //   }
  // }

  const nextQuestion = () => {
    if ((currentQuestion + 1) < questions.length ) {
      setCurrentQuestion(currentQuestion+1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0 ) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  const newStart = () => {
      setCurrentQuestion(0)
      setCorrectScore(0)
      setIncorrectScore(0)
      setAnswerArr([])
  }
  const arr = answerArr 

  const handleClick = (choice, idQuestion) => {

    
    // 0 - 1
    if ( (questions.length - currentQuestion) < 1) {
      arr.push({idQuestion, choice, correctScoreAnswer: ''})
      setAbc(choice)
      setAnswerArr(arr)
    }

    //0, 1
      if ((currentQuestion + 1 ) < questions.length ) {
      setCurrentQuestion(currentQuestion + 1) 
      
      console.log('questionId: ', idQuestion, 'choice:', choice, 'correctScore: ', question.correctScore);
    }
    // if (choice === question.correctScore ) {
    //   console.log('KORREKT!!!')
    // }
    // if (choice !== question.correctScore ) {
    //   console.log('FALSCH!!!')
    // }  
  }

  // const handleClick = (choice, questionId) => {
  //   console.log('questionId: ', questionId, 'choice:', choice, 'correctScore: ', questions[current].correctScore);
  //   if (choice === questions[current].correctScore && (correctScore + incorrectScore) < (questions.length)) {
  //     setCorrectScore(correctScore + 1)
  //   } else if (choice !== questions[current].correctScore && (correctScore + incorrectScore) < (questions.length)  ) {
  //     setIncorrectScore(incorrectScore + 1)
  //   }
  //   if ((current + 1) < questions.length ) {
  //     setCurrent(current + 1) 
  //   }
  //   if ((correctScore + incorrectScore)=== (questions.length) && incorrectScore > 0) {
  //     setDialogIsOpen(true)
  //   }
  //   if ((correctScore + incorrectScore)=== (questions.length) && incorrectScore === 0) {
  //     setDialogConfIsOpen(true)
  //   }
  // }

  // const handleAnswer = (choice ) => {

  // }
    

    // if ((correctScore + incorrectScore) === (questions.length) && incorrectScore === 0) {
    //   setDialogConfIsOpen(true)
    //   // setCurrent(0)
    //   // setIncorrectScore(0)
    //   // setCorrectScore(0)
    // } else if ((correctScore + incorrectScore) === (questions.length) && incorrectScore > 0) {
    //   setDialogTitle('Bitte beantworten Sie die Fragen nochmal. Eine oder mehrere Fragen sind nicht richtig beantwortet. Bitte überprüfen Sie die Antworten.')
    //   setDialogDescription(correctScore + ' Fragen richtig beantwortet. ' + incorrectScore + ' Fragen falsch beantwortet.')
    //   setDialogButtonText('ok')
    //   setDialogIsOpen(true)
    //   setCurrent(0)
    //   setIncorrectScore(0)
    //   setCorrectScore(0)
    // } 

  return(
    <div className="flex justify-around">  
      <div className="w-5/6">
        <H4>{currentQuestion + 1}. von {questions.length} Fragen zur {renderTitle.join(" / ")}</H4>
        <div className={`w-full bg-gray-50 rounded-lg shadow-lg`} >
{/* 
        <DialogOverlay isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen}  title={dialogTitle} description={dialogDescription} buttonText={dialogButtonText}/>
        <DialogConfirmNumber isOpen={dialogConfIsOpen} setIsOpen={setDialogConfIsOpen} submitConfirmation={submitConfirmation} onChangeHandler={onChangeHandler} />
         */}
        <QuizArea handleClick={handleClick} question={question} abc={abc} questionsLength={questions.length} current={currentQuestion} title={title} />
        
        
        <div className="w-full flex">
          <div 
            className="p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md"
            onClick={()=> newStart()}>
              neu starten
          </div>
    
          <div
            className="p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
            onClick={()=> prevQuestion()}>
            prev
          </div>

          <div
            className="p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
            onClick={()=> nextQuestion()}>
            next
          </div>
          <div 
            onClick={() => props.setShowing(dataSet[indexOfItem].showing)}
            className="p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
          >
            Zur Anweisung
          </div>
          <div
            className="p-3 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
            // onClick={()=> submitConfirmation()}
            >
            submitConfirmation
          </div>
        </div>
        <ScoreArea correctScore={correctScore} incorrectScore={incorrectScore} />
      </div>
    </div>
  </div>
  )
}  
