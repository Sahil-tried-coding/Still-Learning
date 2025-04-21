"use client"
import React, { ReactNode, useState } from 'react'
import SidebarHeader from '../dashboard/_components/Header'
import { Userinput } from '../_context/Userinput'

const Courselayout = ({children}:ReactNode) => {
  const [userCourseInput, setUserCourseInput] = useState()
  return (
    <div>
      <Userinput.Provider  value={{userCourseInput, setUserCourseInput}}>

        <>
        <SidebarHeader/>
        {children}
        </>
      </Userinput.Provider>
    </div>
  )
}

export default Courselayout