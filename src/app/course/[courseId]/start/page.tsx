"use client"
import { db } from '@/config/db'

import { ChapterList, CourseList } from '@/config/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterCard from '../../_components/ChapterCard'
import ChapterContent from '../../_components/ChapterContent'
import { useParams } from 'next/navigation'

const CourseStart = () => {
  const { courseId } = useParams() as { courseId: string };

    const [selecteChapter, setSelecteChapter] = useState([])
    const[chapterContent,setChapterContent] = useState([])

    const [course,setCourse] = useState([])
    useEffect(()=>{
        getCourse()
    },[])


    const getChapterContent = async (chapterId) =>{

        const result =  await db.select().from(ChapterList).where(
            and(eq(ChapterList.chapterId,chapterId),eq(ChapterList.courseId,courseId))
        )
        setChapterContent(result[0])
        console.log("this is the content",result)

    }

    const getCourse = async()=>{
        const result = await db.select().from(CourseList).where(eq(CourseList.courseId,courseId))
        // console.log( "this is fucling", result[0])
        setCourse(result[0])
    }
  return (
    <div className='flex'>

    <div className='hidden md:block min-w-80 max-w-80 bg-white h-max border-r-2 '>
        

<div className=' '>
    <h1 className='font-semibold text-xl border-b-2 py-4.5 px-3  bg-blue-500 text-white' >{course?.courseOutput?.CourseName}</h1>

    <div className='flex flex-col  '>
        {
            course?.courseOutput?.Chapters.map((chapter,index)=>(
                <div className={`cursor-pointer  ${selecteChapter == chapter.ChapterName && "bg-blue-200" } `}  onClick={()=>{getChapterContent(index);setSelecteChapter(chapter.ChapterName)}} key={index}>
                    <ChapterCard chapter={chapter} index={index}/>
                </div>
            ))
        }
    </div>
</div>



    </div>
        <div className='p-12 overflow-x-hidden'>
            <ChapterContent content={chapterContent}  chapter={selecteChapter}/> 
        </div>
    </div>

  )
}

export default CourseStart