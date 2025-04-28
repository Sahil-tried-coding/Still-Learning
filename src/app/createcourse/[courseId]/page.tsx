"use client"
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'

import React, { useEffect, useState } from 'react'
import BasicCourseLayout from './_components/BasicCourseLayout'
import { useParams } from 'next/navigation'
import CourseDetails from './_components/CourseDetails'
import ChapterDetails from './_components/ChapterDetails'



const CourseLayout = () => {


  const [course, setCourse] = useState({})
  const {user} = useUser()


  const { courseId } = useParams() as { courseId: string }

  useEffect(()=>{
    getCourse()
  },[courseId,user])
  
  const getCourse = async () =>{


    const result = await db
  .select()
  .from(CourseList)
  .where(
    and(
      eq(CourseList.courseId,courseId),
      eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress || "hmm")
    )
  );

  if(result.length>0){
    
    setCourse(result[0])
  }
  console.log(result)

  }
   

  return (
    <div>
      <div className='md:px-22 lg:px-48 mt-4 lg:flex lg:flex-col lg:items-center'>
      {/* <h1 className='font-semibold'>Course layout</h1> */}





      {/* basic course info */}
<BasicCourseLayout course={course} />

{/* course details */}
<CourseDetails course={course} />


<ChapterDetails course={course}/>
      </div>
    </div>
  )
}

export default CourseLayout