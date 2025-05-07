"use client"
import React, { ReactNode, useState } from 'react';
import SidebarHeader from '../dashboard/_components/Header';
import { Userinput } from '../_context/Userinput';

interface LayoutProps {
  children: ReactNode;
}

const Courselayout = ({ children }: LayoutProps) => {
  const [userCourseInput, setUserCourseInput] = useState<any>(null);

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
