import React, { useState } from 'react';
import { useParams } from 'react-router';
import VideoJS from './VideoJS' // point to where the functional component is stored
import 'video.js/dist/video-js.css';
import { Instruction } from './Instruction'
import { dataSet } from './data/index';
import { Quiz } from './quiz/Quiz'
import { anleitung } from './data/index';

export const Course = (props) => {
  
  // const playerRef = React.useRef(null);
  const { indexOfItem} = useParams()
  const course = dataSet[indexOfItem]
  const [showing, setShowing] = useState(course.showing || 'video')
 
  const videoAnleitung = anleitung.video
  const title = course.title




  if (showing === 'video') {
    return (
      <VideoJS options={course.video} setShowing={setShowing}  title={title} text={videoAnleitung}  />   
    )
  }

  if (showing === 'instructions') {
    return (
        <Instruction course={course} setShowing={setShowing} />
    )
  }

  if (showing === 'quiz') {
    return (
      <Quiz setShowing={setShowing} />
    )
  }
}