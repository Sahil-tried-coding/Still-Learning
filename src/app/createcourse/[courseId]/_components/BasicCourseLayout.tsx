import Image from "next/image";
import React from "react";
import placeholder from "../../../../../public/placeholder.png";
import { TbCategory } from "react-icons/tb";
import { Button } from "@/components/ui/button";

const BasicCourseLayout = ({ course }) => {
  return (
    <div className="p-10 border shadow-2xl mt-5 lg:w-[90%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div>
          <h1 className="font-semibold text-2xl">
            {course?.courseOutput?.CourseName}
          </h1>
          <h1 className=" text-sm text-gray-400 mt-3">
            {course.courseOutput?.Description}
          </h1>
          <div className="flex mt-4 gap-3 text-blue-400 items-center font-semibold">
            <TbCategory />
            <h1>{course?.category}</h1>
          </div>
          <Button className= "bg-blue-500 mt-4 text-white font-semibold w-full">Start</Button>
        </div>
        <div>
          <Image
            className=" h-[250px] rounded-2xl object-contain"
            alt="img"
            src={placeholder}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicCourseLayout;
