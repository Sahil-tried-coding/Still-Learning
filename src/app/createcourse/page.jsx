"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { TbTableOptions } from "react-icons/tb";
import Category from "./_component/Category";
import Topic_description from "./_component/Topic_description";
import Options from "./_component/Options";
import { Userinput } from "../_context/Userinput";
import LoadingDailog from "./_component/LoadingDailog";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";




const Createcourse = () => {
  const { userCourseInput, setUserCourseInput } = useContext(Userinput);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const { user }  = useUser()

  const router = useRouter()

  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <BiCategoryAlt />,
    },
    {
      id: 2,
      name: "Topic",
      icon: <FaRegLightbulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <TbTableOptions />,
    },
  ];

  const checkStatus = () => {
    if (userCourseInput?.length == 0 || userCourseInput == undefined) {
      return true;
    }

    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 2 &&
      (userCourseInput?.duration?.length == 0 ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.level?.length == 0 ||
        userCourseInput?.level == undefined ||
        userCourseInput?.chapters?.length == 0 ||
        userCourseInput?.chapters == undefined ||
        userCourseInput?.videoContent?.length == 0 ||
        userCourseInput?.videoContent == undefined)
    ) {
      return true;
    }
    return false;
  };

  const SaveCourseLayoutIntoDb = async (cousreLayout) =>{
    setUserCourseInput(Userinput)
    const id = uuidv4();
    setLoading(true)
    const result = await db.insert(CourseList).values({

      courseId:id,
      name:userCourseInput.topic,
      category:userCourseInput.category,
      level:userCourseInput.level,
      courseOutput:cousreLayout,
      userName:user?.fullName,
      createdBy:user?.primaryEmailAddress?.emailAddress || "no user got",
      userImage:user?.imageUrl

    })
    console.log(result)
    setLoading(false)
    router.replace("/createcourse/"+ id)
    
  }
  const generateCourseLayout = async () => {


    const prompt = `Generate A Course Tutorial on Following
Detail With field as CourseName,
Description, Along with ChapterName,
about, Duration: Category:${userCourseInput.category},
Topic:${userCourseInput.topic}, Level:${userCourseInput.level}, Duration: ${userCourseInput.duration},
NoOfChapters:${userCourseInput.chapters}, in strictly JSON format`;
  //   const prompt = `Generate a course tutorial with the following details:
  // - Category: ${userCourseInput.category}
  // - Topic: ${userCourseInput.topic}
  // - Level: ${userCourseInput.level}
  // - Duration: ${userCourseInput.duration}
  // - Chapters: ${userCourseInput.chapters}
  // Include course name, description, chapter names with summaries, and total duration.  in  JSON format.`;

    try {
      setLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      const data_2 = await data.choices[0].message.content
      const output = await data_2.slice(7, -3).trim()
      SaveCourseLayoutIntoDb(output)
      console.log(output);

      
    } catch (err) {
      console.error("❌ Something went wrong:", err);
    } finally {
      setLoading(false) 
    }


    


  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex items-center justify-center ">
        <div className="mt-4 md:mt-0 text-3xl font-semibold text-blue-500">
          Create Course
        </div>
      </div>

      {/* stepper */}
      <div className="  mx-auto flex mt-6 md:mt-10 items-center justify-center ">
        {StepperOptions.map((item, index) => (
          <div className=" flex items-center gap-5" key={index}>
            <div className="flex ml-2 flex-col items-center">
              <div
                className={`text-3xl p-3 w-[60px] text-white rounded-full ${
                  activeIndex >= index ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                {item.icon}
              </div>

              <div className="text-xs mt-1 md:text-base md:mt-0">{item.name}</div>
            </div>
            {index !== StepperOptions.length - 1 && (
              <div
                className={`h-1 w-[80px] md:w-[100px] rounded-full ${
                  activeIndex - 1 >= index ? "bg-blue-500" : "bg-gray-400"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div>
        {activeIndex == 0 && <Category />}
        {activeIndex == 1 && <Topic_description />}
        {activeIndex == 2 && <Options />}
      </div>

      <div className="flex justify-between md:px-11 mt-6.5 px-6 md:mt-14 lg:px-44">
        <Button
          disabled={activeIndex == 0}
          variant={"outline"}
          onClick={() => setActiveIndex(activeIndex - 1)}
          className=" cursor-pointer bg-blue-500 text-white"
        >
          Preveous
        </Button>
        {activeIndex < 2 && (
          <Button
            disabled={checkStatus()}
            onClick={() => setActiveIndex(activeIndex + 1)}
            className=" cursor-pointer bg-blue-500 text-white"
          >
            Next
          </Button>
        )}
        {activeIndex == 2 && (
          <Button
            disabled={checkStatus()}
            className=" cursor-pointer bg-blue-500 text-white"
            onClick={() => generateCourseLayout()}
          >
            {loading ? "Loding" : "+ Generate Course"}
          </Button>
        )}
      </div>
      <LoadingDailog loading={loading}/>
    </div>
  );
};

export default Createcourse;
