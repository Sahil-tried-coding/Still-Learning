"use client"

import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BasicCourseLayout from '../_components/BasicCourseLayout';
import Image from 'next/image';
type courseType = {
  id: number;
  name: string;
  courseId: string;
  courseOutput: {
    CourseName: string;
    Duration: string;
    Description: string;
    Level: string;
    Category: string;
    NoOfChapters: number;
    Topic: string;
    Chapters: [
      {
        ChapterName: string;
        Duration: string;
        About: string;
      }
    ];
  };
  courseImage: string;
  includeVideo: string;
  userImage: string;
  userName: string;
  category: string;
  createdBy: string;
};
const Finish = () => {
    const [course, setCourse] = useState<courseType>({
      name: "",
      id: 0,
      createdBy: "",
      courseId: "",
      courseOutput: {
        CourseName: "",
        Category: "",
        Topic: "",
        Duration: "",
        Description: "",
        Level: "",
        NoOfChapters: 0,
        Chapters: [
          {
            ChapterName: "",
            Duration: "",
            About: "",
          },
        ],
      },
      courseImage: "",
      includeVideo: "Yes",
      userImage: "",
      userName: "",
      category: "",
    });
  
  
    const { user } = useUser();
  
  
    const { courseId } = useParams() as { courseId: string };
  
    useEffect(() => {
      getCourse();
    }, [courseId, user]);
  
    const getCourse = async () => {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, courseId),
            eq(
              CourseList.createdBy,
              user?.primaryEmailAddress?.emailAddress || "hmm"
            )
          )
        );
  
      if (result.length > 0) {
        setCourse(result[0]);
      }
    };
  return (
    <div className='mt-3 mx-3 md:px-22 lg:mx-44'>
      <h1 className="font-bold mx-20 text-center text-xl text-blue-600 mb-1.5 ">
      Your AI-powered <span className=' capitalize'>{course?.name}</span> journey starts here with <span className='bg-white whitespace-nowrap text-black md:bg-black md:text-white md:px-4 py-1 rounded-md '>  Still Learning.</span></h1> <h1 className="font-bold text-center text-xl text-blue-600 mb-6">Dive in, Share with others, and keep the curiosity alive!</h1> 
      <BasicCourseLayout course={course}/>


    <h1 className="font-semibold my-2.5 text-xl text-blue-600 tracking-wide ">
      Course URL :
    </h1>

      <h1 className='text-xs mb-3 border max-w-max p-2 text-center text-gray-400 flex items-center gap-3 '>{process.env.NEXT_PUBLIC_HOST_NAME}course/view/{course?.courseId}

        <Image onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"course/view/"+course?.courseId)} className='cursor-pointer' src={"/copy.png"} width={25} height={25 }  alt='copy'/>
      </h1>
    </div>
  )
}

export default Finish