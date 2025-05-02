"use client"
import Header from '@/app/_components/Header'
import BasicCourseLayout from '@/app/createcourse/[courseId]/_components/BasicCourseLayout'
import ChapterDetails from '@/app/createcourse/[courseId]/_components/ChapterDetails'
import CourseDetails from '@/app/createcourse/[courseId]/_components/CourseDetails'
import SidebarHeader from '@/app/dashboard/_components/Header'

import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CourseView = () => {

    const [course, setCourse] = useState([])
      const { courseId } = useParams() as { courseId: string };
    

      useEffect(() => {
        getCourse();
      }, [courseId]);
    
      const getCourse = async () => {
        const result = await db
          .select()
          .from(CourseList)
          .where(
              eq(CourseList.courseId, courseId),
          );

          setCourse(result[0])

    
        
      };
  return (
    <div className='md:px-22'>
        <SidebarHeader/>
        <div className='md:px-44 mt-12 flex flex-col items-center justify-center'>
        <BasicCourseLayout course={course} />
        <CourseDetails course={course}/>
        <ChapterDetails course={course}/>
        </div>

    </div>
  )
}

export default CourseView