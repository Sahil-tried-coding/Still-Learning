"use client"
import React, {  useState } from 'react';
import SidebarHeader from '../dashboard/_components/Header';
import { Userinput } from '../_context/Userinput';


const Courselayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState(null);

  return (
    <div>
      <Userinput.Provider value={{ userCourseInput, setUserCourseInput }}>
        <>
          <SidebarHeader />
          {children}
        </>
      </Userinput.Provider>
    </div>
  );
};

export default Courselayout;
