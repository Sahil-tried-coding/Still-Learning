"use client";
import { db } from "@/config/db";
import { ChapterList, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

import React, { useEffect, useState } from "react";
import BasicCourseLayout from "./_components/BasicCourseLayout";
import { useParams, useRouter } from "next/navigation";
import CourseDetails from "./_components/CourseDetails";
import ChapterDetails from "./_components/ChapterDetails";
import { Button } from "@/components/ui/button";
import LoadingDailog from "../_component/LoadingDailog";
import getYoutubeVideo from "@/config/Service";


const CourseLayout = () => {
  const [loading, setLoading] = useState(false);
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

  const router = useRouter();

  const { user } = useUser();


  const { courseId } = useParams() ;

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

    if (result.length >0 ) {
      setCourse(result[0]);
    }
    
    console.log("this is result[0]", result[0]);
  };

  const GenerateCourseContent = async () => {
    setLoading(true);
    const Chapters = course?.courseOutput?.Chapters;

    Chapters.forEach((chapter, index) => {
      let content = "";
      let videoId = "";
      
//       const prompt = `Generate a strict JSON array for a chapter explanation on the topic below.

// Each item in the array must follow this structure:

// Required fields:
// - title: string
// - explanation: string
// - codeExample: { description: string, code: string } — code must be wrapped in <predcode>...</predcode>
// - notes: string

// Optional fields (include only if relevant):
// - advantages: array of strings
// - bestPractices: array of strings
// - coolStuff: array of strings

// The output must be a pure JSON array. No markdown, no surrounding text. No extra keys outside this schema.

// Topic: ${course.name}, Chapter: ${chapter.ChapterName}

// Explain the concepts clearly and provide examples where applicable. Stick strictly to the structure.
// `



      // const prompt =
      //   "Explain the concept in Detail on topic" +
      //   course?.name +
      //   ", Chapter" +
      //   chapter.ChapterName +
      //   ", in JSON format with list or array with field as title,explaination on give chapter in detail , code Example(Code filed in <predcode> format) if applicable";
      const prompt = `Generate a strict JSON array for a chapter explanation on the topic below.

      Each item in the array must follow this structure:
      
      Required fields:
      - title: string
      - explanation: string
      - codeExample: { description: string, code: string } — code should be plain string (NO HTML or markdown tags!)
      - notes: string
      
      Optional fields (include only if relevant):
      - advantages: array of strings
      - bestPractices: array of strings
      - coolStuff: array of strings
      - disadvantages: array of strings
      - commonMistakes: array of strings
      - interviewTips: array of strings
      - realWorldUseCases: array of strings
      - assignments : array of strings
      
      Return ONLY the JSON array. No markdown, no explanation, no text outside the array. Do not wrap code in tags or backticks.
      
      Topic: ${course.name}, Chapter: ${chapter.ChapterName}
      
      Explain the concepts clearly. Use clean, parsable JSON.
      `;
      
      const getAiRespones = async () => {
        try {
          getYoutubeVideo(course?.name + ":" + chapter.ChapterName).then(
            (res) => {
              videoId = res?.items[0]?.id?.videoId;
              console.log(videoId);
            }
          );

          const response = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ prompt }),
          });

          const data = await response.json();
          const data_2 = await data.choices[0].message.content;
          // console.log("✅ this is data 2", data_2);

          const output = await data_2.slice(7, -3).trim();
          console.log(output);
          content = output;

          await db.insert(ChapterList).values({
            chapterId: index,
            videoId: videoId,
            courseId: course?.courseId,
            content: content,
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getAiRespones();
    });
    router.replace("/createcourse/" + course?.courseId + "/finish");
  };

  return (
    <div>
      <div className="w-full px md:px-22 lg:px-48 mt-4 lg:flex lg:flex-col lg:items-center">
      <h1 className="font-bold text-center text-4xl text-blue-600 tracking-wide mb-6">
        Course Layout
      </h1>

        {/* basic course info */}
        <BasicCourseLayout  course={course} />

        {/* course details */}
        <CourseDetails course={course} />
        <Button
          className="bg-green-600 text-white font-semibold cursor-pointer my-5.5 w-[90%] mx-4 h-14"
          onClick={GenerateCourseContent}
        >
          Generate Content
        </Button>
        <ChapterDetails course={course} />

        
      </div>
      <LoadingDailog loading={loading} />
    </div>
  );
};

export default CourseLayout;   
