"use client"
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
// import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
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
const UserCourseList = () => {


    const [allCourse, setAllCourse] = useState<courseType[]>([{
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
      }])


    const {user} = useUser()

    useEffect(()=>{
        getAllCourse()
    },[user])

    const getAllCourse = async()=>{

     const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress ?? ""))

     if(result.length > 0){

         setAllCourse(result)
     }
        console.log(result)
    }


  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-3'>
            {
                allCourse.map((item,index)=>(
                    <div className='border-2 p-2 border-black' key={index}>
                        <Image className='w-full h-[170px]' src={item?.courseImage ?item?.courseImage : "/placeholder.png"  } alt='Image' width={100} height={100}/> 
                        <h1>{item.name}</h1>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default UserCourseList