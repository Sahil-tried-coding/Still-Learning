import Image from "next/image";
import React from "react";
import placeholder from "../../../../../public/placeholder.png";
import { TbCategory } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import EditBasicCourseInfo from "./EditBasicCourseInfo";

const BasicCourseLayout = ({ course }) => {
  return (
    <div className="flex flex-col">
<h1 className="font-semibold text-center text-3xl text-blue-500 ">Course Layout </h1>
      <div className="px-10  py-10 border shadow-md mt-5 lg:w-[100%]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-2xl flex items-center gap-2.5">
            {/* Java for experts  🚀 */}
            {course?.courseOutput?.CourseName}
            <EditBasicCourseInfo course={course}/>
          </h1>
          <h1 className=" text-sm text-gray-400 mt-3">
            {course.courseOutput?.Description}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolorem dolorum incidunt sunt deleniti, eum natus ipsum dicta iusto reiciendis architecto, labore odio atque fugiat quas eaque recusandae ipsam placeat. */}
          </h1>
          <div className="flex mt-4 gap-1.5 text-blue-400 items-center font-semibold">
            <TbCategory />
            <h1>{course?.category}</h1>
          </div>
          <Button className= "cursor-pointer bg-blue-500 mt-4 text-white font-semibold w-full">Start</Button>
        </div>
        <div>
          <Image
            className="  h-[250px]  rounded-2xl object-contain"
            alt="img"
            src={"/image.png"}
            width={600}
            height={150}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default BasicCourseLayout;
