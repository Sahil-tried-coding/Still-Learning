/* eslint-disable */

"use client";
import { db } from "@/config/db";

import { ChapterList, CourseList } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterCard from "../../_components/ChapterCard";
import ChapterContent from "../../_components/ChapterContent";
import { useParams } from "next/navigation";
import SidebarHeader from "@/app/dashboard/_components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const CourseStart = () => {
  const { courseId } = useParams()  

  const [selecteChapter, setSelecteChapter] = useState("");
  const [chapterContent, setChapterContent] = useState();

  const [course, setCourse] = useState();
  useEffect(() => {
    getCourse();
  }, []);

  const getChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(ChapterList)
      .where(
        and(
          eq(ChapterList.courseId, courseId),
          eq(ChapterList.chapterId, chapterId)
        )
      );
    setChapterContent(result[0]);
    console.log("this is the content", result);
  };

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));
  
   
    setCourse(result[0]);
  };
  
  return (
    <div className="flex flex-col ">
      <SidebarHeader />
      <div className="flex flex-col md:flex-row">
        <div className="block w-[100%] p-3 md:p-0  md:block md:min-w-80 md:max-w-80 bg-white h-max border-r-2 ">
          <div className=" ">
            <h1 className="font-semibold text-xl border-b-2 py-4.5 px-3  bg-blue-500 text-white">
              {course?.courseOutput?.CourseName}
            </h1>

            <div className="flex flex-col  ">
              {course?.courseOutput?.Chapters.map((chapter, index) => (
                <div
                  className={`cursor-pointer  ${
                    selecteChapter == chapter.ChapterName && "bg-blue-200"
                  } `}
                  onClick={() => {
                    getChapterContent(index);
                    setSelecteChapter(chapter.ChapterName);
                  }}
                  key={index}
                >
                  <ChapterCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
            <Link href={`/createcourse/${courseId}/finish`}>
              <Button className="cursor-pointer bg-green-600 md:text-xl mt2 text-white font-semibold w-full md:h-[60px] ">
                Share Course
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:p-12 p-4 overflow-x-hidden">
          {selecteChapter.length == 0 && (
            <div className="lg:py-40 lg:px-40 flex  md:translate-7 items-center justify-center">
              {/* <div className='flex gap-1 items-center font-semibold text-2xl'>
                <Image src={"/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp"} alt='logo' height={100} width={100} />
                <h1>Still Learning</h1>
                </div> */}
              <h1 className="md:text-4xl text-black border-blue-600 capitalize border-4 p-8 items-center justify-center font-semibold text-center">
                Pick a chapter and dive in! 🎯📘
              </h1>

              {/* <h1>Click on the Chapter to get started now 🚀✅🔥🎀</h1> */}
            </div>
          )}
          {chapterContent && selecteChapter.length > 0 && (
  <ChapterContent
    course={course}
    content={chapterContent}
    chapter={selecteChapter}
  />
)}
        </div>
      </div>
    </div>
  );
};

export default CourseStart;
