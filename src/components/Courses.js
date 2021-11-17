import React from 'react';
import { Link } from 'react-router-dom';

import { dataSet } from './data/index';
import { H1 } from './Headline';

export const Courses = () => {

  function Course(props) {
    
    const renderItems = props.course.title
    const renderObj = Object.entries(renderItems).map(([key, value], index) => {
      return (<div key={index} >{key}: {value}</div>)
    })
  
    return (
      <li className="">
        <Link to={`/courses/${props.choice}`} > 
          <div className="p-3 w-full text-primary hover:bg-primary hover:text-gray-100  rounded-md" >
            {renderObj}
          </div>
        </Link>
      </li>
    )
  }

  function CourseList() {
    let courseArr = []
    for (let i = 0; i < dataSet.length; i++) {
      courseArr.push(<Course key={i} choice={i} course={dataSet[i]} /> )
    }
    return (  
      <ul className="divide-y-2 divide-gray-100">
          {courseArr}
      </ul>
    )
  }

  return (
    <div className="flex justify-around p-5">
      <div className="p-5 ">
        <H1>Schulungen</H1>
        <div className="w-full bg-white rounded-lg shadow-lg">
          <CourseList />
        </div>
      </div>
    </div>
  )
}
 