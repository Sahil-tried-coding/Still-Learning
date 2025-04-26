import Image from "next/image";
import React from "react";
import { TbAntennaBars5 } from "react-icons/tb";

const CourseDetails = ({ course }) => {
  return (
    <div className="shadow-lg w-full border p-6 mt-4.5 lg:mx-48">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="flex items-center gap-3">
          <div className="text-3xl">
            {/* icons */}
            <Image alt="ok" src={"/start.png"} width={30} height={30} />
            {/* <TbAntennaBars5 /> */}
          </div>
          <div>
            <div className="text-xs text-gray-400">
              {/*  name */}
              Skill level
            </div>
            <div className="text-lg font-semibold">
              {course?.level}
              {/*  dec */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {/* icons */}
            <Image alt="ok" src={"/clock.png"} width={30} height={30} />
            {/* <TbAntennaBars5 /> */}
          </div>
          <div>
            <div className="text-xs text-gray-400">
              {/*  name */}
              Duration
            </div>
            <div className="text-lg font-semibold">
            {course?.courseOutput?.Duration}
              {/*  dec */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {/* icons */}
            <Image alt="ok" src={"/chapter.png"} width={30} height={30} />
            {/* <TbAntennaBars5 /> */}
          </div>
          <div>
            <div className="text-xs text-gray-400">
              {/*  name */}
              No. of Chapters
            </div>
            <div className="text-lg font-semibold">
            {course?.courseOutput?.NoOfChapters}
              {/*  dec */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {/* icons */}
            <Image alt="ok" src={"/youtube.png"} width={30} height={30} />
            {/* <TbAntennaBars5 /> */}
          </div>
          <div>
            <div className="text-xs text-gray-400">
              {/*  name */}
              Video Content ?
            </div>
            <div className="text-lg font-semibold">
            {course?.includeVideo}
              {/*  dec */}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CourseDetails;
