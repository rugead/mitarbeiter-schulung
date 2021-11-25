import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router';
import { getDoc, doc, collection, addDoc, Timestamp } from '@firebase/firestore';

import {  useUser, db } from '../../firebase'
// import { getUserData } from '../user';
import { dataSet} from "../data/"
import { QuizArea, ScoreArea } from './QuizFunctions';
import { H4} from '../Headline'

export const Quiz = (props) => {
  const { user } = useUser()
  const [userData, setUserData]= useState()
  console.log('userData: ', userData);
  const { indexOfItem} = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctScore, setCorrectScore] = useState(0)
  const [incorrectScore, setIncorrectScore] = useState(0)
  const [clickedAnswers, setClickedAnswers] = useState({})
  
  // const [userData, setUserData] =useState()
  const title = dataSet[indexOfItem].title
  
  const questions = dataSet[indexOfItem].questions
  const question = questions[currentQuestion]
  
  
  console.log(
    'userData: ', userData,
    'courseId: ', dataSet[indexOfItem].courseId,
    'user email: ', user.email,
    'user UID:', user.uid,
    'clickedAnswers: ', clickedAnswers, 
    'current: ', currentQuestion,  
    'QuestionLength: ', questions.length, 
    'false: ', incorrectScore, 
    'true: ', correctScore,
    'title: ', title,
    );

    useEffect(() => {
      const getUserData = async () => {
        if (!user) return 
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef);
        const userDoc = docSnap.data()
        setUserData(userDoc)        
        }
       getUserData()
    }, [user])
  
  useEffect(() => {
    let correct = 0 
    let incorrect = 0

    Object.entries(clickedAnswers).map(([key, value]) => {
      if (value.c === value.d) { correct += 1 }
      if (value.c !== value.d) { incorrect += 1 }
      const corr = value.c === value.d ? true : false
      return corr
    })

    setCorrectScore(correct)
    setIncorrectScore(incorrect)

  },[clickedAnswers])

  const handleClick = (ev) => {
    ev.preventDefault()
    const i = ev.target.attributes.choice.value
    
    const newClickedAnswers = {...clickedAnswers}
    newClickedAnswers[question.idQuestion] = {
      a: question.answers[i],
      c: question.correctAnswer,
      d: parseInt(i, 10)
    }
    setClickedAnswers(newClickedAnswers)
  }
  
  const renderTitle = Object.entries(title).map(([key, value]) => {
    return (value)
  })

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
      setClickedAnswers({})
  }

  const lessonProps = {
    title: title,
    courseId: dataSet[indexOfItem].courseId,
    category: dataSet[indexOfItem].categories,
    showing: dataSet[indexOfItem].showing,
    personalnummer_user: 'personalnummer-u',
    personalnummer_confirmation: 'personalnummer-c',
    userDisplayName: user.displayName,
    userId: user.uid,
    userEmail: user.email,
    createdAt: new Date(Date.now()),
    Timestamp: Timestamp.fromDate(new Date(Date.now())),
  };

  const submitConfirmation = async () => {
    const docRef = await addDoc(collection(db, "lessons"), lessonProps);
    console.log('docRef: ', docRef);
  }

  return(
    <div className="flex justify-around">  
      <div className="w-5/6">
        <H4>{currentQuestion + 1}. von {questions.length} Fragen zur {renderTitle.join(" / ")}</H4>
        <div className={`w-full bg-gray-50 rounded-lg shadow-lg`} >

        <QuizArea 
          handleClick={handleClick} 
          question={question} 
          clickedAnswers={clickedAnswers} 
          questionsLength={questions.length} 
          current={currentQuestion} 
          title={title} 
        />
        
        
        <div className="w-full flex justify-between flex-wrap">
    
          <div
            className="p-3 flex-1 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
            onClick={()=> prevQuestion()}>
            prev
              </div>
          <div 
            className="p-3 ml-3 flex-1 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md"
            onClick={()=> newStart()}>
              refresh
          </div>

          <div 
            onClick={() => props.setShowing(dataSet[indexOfItem].showing)}
            className="p-3 ml-3 flex-1 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
          >
            Zur Anweisung
          </div>

          <div
            className="p-3  ml-3 flex-1 text-primary hover:bg-primary text-lg font-medium text-center mt-5  border border-primary cursor-pointer hover:text-gray-100 rounded-md" 
            onClick={()=> nextQuestion()}>
            next
          </div>
          { (questions.length === correctScore) ?
            <div
              className="p-3  ml-3 flex-1 text-white hover:bg-primary bg-green-500 text-lg font-medium text-center mt-5  border border-gray-500 cursor-pointer hover:text-gray-100 rounded-md" 
              onClick={()=> submitConfirmation()}
            >
              submitConfirmation
            </div>
            :
            ""
          }
        </div>
        <ScoreArea correctScore={correctScore} incorrectScore={incorrectScore} />
      </div>
    </div>
  </div>
  )
}  
