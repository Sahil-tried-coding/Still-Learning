"use client";
import { db } from "@/config/db";
import { ChapterList, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import BasicCourseLayout from "./_components/BasicCourseLayout";
import { useParams, useRouter } from "next/navigation";
import CourseDetails from "./_components/CourseDetails";
import ChapterDetails from "./_components/ChapterDetails";
import { Button } from "@/components/ui/button";
import LoadingDailog from "../_component/LoadingDailog";
import getYoutubeVideo from "@/config/Service";
import { randomUUID } from "crypto";

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
      const prompt =
        "Explain the concept in Detail on topic" +
        course?.name +
        ", Chapter" +
        chapter.ChapterName +
        ", in JSON format with list or array with field as title,explaination on give chapter in detail , code Example(Code filed in <predcode> format) if applicable";

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
      <div className="md:px-22 lg:px-48 mt-4 lg:flex lg:flex-col lg:items-center">
      <h1 className="font-bold text-center text-4xl text-blue-600 tracking-wide mb-6">
        Course Layout
      </h1>

        {/* basic course info */}
        <BasicCourseLayout  course={course} />

        {/* course details */}
        <CourseDetails course={course} />

        <ChapterDetails course={course} />

        <Button
          className="bg-blue-500 text-white font-semibold cursor-pointer my-3.5"
          onClick={GenerateCourseContent}
        >
          Generate Content
        </Button>
      </div>
      <LoadingDailog loading={loading} />
    </div>
  );
};

export default CourseLayout;
