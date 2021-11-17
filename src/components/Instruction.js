import React, { useState } from "react";
import { H3 } from "./Headline";
import {DialogText} from "./DialogText"
import no from '../img/no.jpg'
import { anleitung } from "./data";

export const Instruction = ( props ) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(true)
  const { setShowing, course } = props;

  const renderTitle= Object.entries(course.title).map(([key, value]) => {
    return (value)
  })
  
  function ItemsTable(props) {
    return props.items.map((item, index) => {
      return (
        <tr key={index}>
          <td className="p-1">
            <div className="flex w-full items-center">
              <div className="flex-shrink-0 h-8 sm:h-12 md:h-16 w-12 sm:w-16 md:w-24">
               {(item.icon) ? <img src={process.env.PUBLIC_URL + item?.icon} alt="" /> : <img src={no} alt="" className="" />  }              
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-900">
                {item.text}
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) 
    })
  }  


  function BlockTable() {
    return course?.instructions?.blocks?.map((block,index) => {
      return (
        <table 
          key={index} 
          className="w-full p-2 bg-white border-8 border-blue-300"
        >
          <thead className="bg-blue-300 w-full">
            <tr key="1">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase bg-blue-300 tracking-wider">
                {block.headline}  
              </th>
            </tr>
          </thead>
          <tbody className="w-full bg-white divide-y divide-gray-200">
            <ItemsTable  items={block.items}/>
          </tbody>
        </table>
      )
    })
  }




  return (
    <div className="flex justify-around">  
      <DialogText isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} title={course.title} text={anleitung.instruction} buttonText='weiter'/> 
      <div className="w-5/6 md:w-2/3 xl:w-2/4">
      
          <div className="w-full flex p-2 bg-white border-8 border-blue-300">
            <div >
              <img src={process.env.PUBLIC_URL + course?.instructions?.logo}  alt="Münzel Logo"/>
            </div>

            <div className="pl-5">
              <H3>Betriebsanweisung: </H3>
              <H3>{renderTitle.join(" / ")}</H3>
              <div className="p-3">
                  {course?.instructions?.subTitle}
              </div>
            </div>
          </div>
      
          <BlockTable />

          <div 
            onClick={() => setShowing('quiz')}
            className="w-full mt-5 mb-5 p-3 text-primary hover:bg-primary text-lg font-medium text-center   border border-primary cursor-pointer hover:text-gray-100  rounded-md" 
          >
            Zum Quiz hier klicken!
          </div>

      </div>
    </div>
  );
}
