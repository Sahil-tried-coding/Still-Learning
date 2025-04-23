"use client"
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'

import React, { useEffect, useState } from 'react'
import BasicCourseLayout from './_components/BasicCourseLayout'


// type ParamType = {
//   courseId:string
// }

const CourseLayout = ({params}:{params: {courseId:string}}) => {


  const [course, setCourse] = useState({})
  const {user} = useUser()

  useEffect(()=>{
    getCourse()
  },[params.courseId,user])
  
  const getCourse = async () =>{


    const result = await db
  .select()
  .from(CourseList)
  .where(
    and(
      eq(CourseList.courseId, params.courseId),
      eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress || "hmm")
    )
  );

  setCourse(result[0])
  console.log(result)

  }
   

  return (
    <div>
      <div className='md:px-22 lg:px-44 mt-10'>
      <h1>Course layout</h1>





      {/* basic course info */}
<BasicCourseLayout course={course} />
      </div>
    </div>
  )
}

export default CourseLayout