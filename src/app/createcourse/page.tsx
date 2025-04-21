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
// import { generateCourseContent } from "@/config/Aimodel";

const Createcourse = () => {
  const { userCourseInput, setUserCourseInput } = useContext(Userinput);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);

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

  // const generateCourseLayout = async ()=>{

  //   // if (loading) return;
  //   // setLoading(true);
  //   const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration.'

  //   const AI_PROMPT = ' Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Level: '+userCourseInput?.level+', Duration: '+userCourseInput?.duration+', NoOf Chapters: '+userCourseInput?.chapters+', in JSON format'

  //   const FULL_PROMPT = BASIC_PROMPT + AI_PROMPT

  // try {
  //   const course = await generateCourseContent(FULL_PROMPT);
  //   console.log("Generated Course:", course);
  //   // handle output
  // } catch (err) {
  //   console.error("Error:", err);
  //   alert("Too many requests. Try again soon.");
  // } finally {
  //   setLoading(false);
  // }
  // }

  const generateCourseLayout = async () => {
//     const prompt = `Return JSON in the following format only:

// {
//   "course": {
//     "category": "${userCourseInput.category}",
//     "topic": "${userCourseInput.topic}",
//     "level": "${userCourseInput.level}",
//     "duration": "${userCourseInput.duration}",
//     "numberOfChapters": ${userCourseInput.chapters},
//     "name": "<Course Title>",
//     "description": "<Brief description of the course>",
//     "chapters": [
//       {
//         "title": "<Chapter 1 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 2 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 3 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 4 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 5 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 6 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 7 title>",
//         "summary": "<Short 1-2 line summary>"
//       },
//       {
//         "title": "<Chapter 8 title>",
//         "summary": "<Short 1-2 line summary>"
//       },

//     ]
//   }
// }
// Include course name, description, chapter names with brief best Explanation summaries, and total duration.  in  JSON format.
// `;

//     const prompt = `Return JSON in the following format only:

//   "course": {
//     "category": "...",
//     "topic": "...",
//     "level": "...",
//     "duration": "...",
//     "numberOfChapters": ...,
//     "name": "...",
//     "description": "...",
//     "chapters": ["..."]
//   }


// Now generate a course tutorial with these values:
// - Category: ${userCourseInput.category}
// - Topic: ${userCourseInput.topic}
// - Level: ${userCourseInput.level}
// - Duration: ${userCourseInput.duration}
// - Chapters: ${userCourseInput.chapters} Include course name, description, chapter names with summaries, and total duration.`;

    const prompt = `Generate A Course Tutorial on Following
Detail With field as Course Name,
Description, Along with Chapter Name,
about, Duration: Category:${userCourseInput.category},
Topic:${userCourseInput.topic}, Level:${userCourseInput.level}, Duration: ${userCourseInput.duration},
NoOf Chapters:${userCourseInput.chapters}, in JSON format`;
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
      // const myData = JSON.stringify(data);
      console.log("✅ Course Data:", data);
      
    } catch (err) {
      console.error("❌ Something went wrong:", err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <div className="text-3xl font-semibold text-blue-500">
          Create Course
        </div>
      </div>

      {/* stepper */}
      <div className="flex mt-10 items-center justify-center ">
        {StepperOptions.map((item, index) => (
          <div className="flex items-center gap-5" key={index}>
            <div className="flex ml-2 flex-col items-center">
              <div
                className={`text-3xl p-3 w-[60px] text-white rounded-full ${
                  activeIndex >= index ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                {item.icon}
              </div>

              <div>{item.name}</div>
            </div>
            {index !== StepperOptions.length - 1 && (
              <div
                className={`h-1 w-[100px] rounded-full ${
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

      <div className="flex justify-between md:px-11 mt-14 lg:px-44">
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
