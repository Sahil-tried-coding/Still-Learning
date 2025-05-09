"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import EditBasicCourseInfo from "./EditBasicCourseInfo";
import { Input } from "@/components/ui/input";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import placeholder from "../../../../../public/placeholder.png"
import Link from "next/link";

const BasicCourseLayout = ({ course }) => {
  const [firebaseImage, setFirebaseImage] = useState(course?.courseImage );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, "images/" + fileName);

    try {
      setLoading(true); // Start Loading

      await uploadBytes(storageRef, file);
      console.log("file uploaded successfully");

      const downloadURL = await getDownloadURL(storageRef);

      await saveImageToDb(downloadURL);

      await setFirebaseImage(downloadURL); // Update the state
      setLoading(false); // Done loading
      router.refresh(); // Refresh server data
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  const saveImageToDb = async (url) => {
    const result = await db.update(CourseList)
      .set({ courseImage: url })
      .where(eq(CourseList.id, course.id));

    if (result) {
      console.log("done image uploaded to drizzle");
    }
  };


  useEffect(()=>{
    setFirebaseImage(course.courseImage)
  },[course])

  // let parsedCourse = {}
  // parsedCourse = course.courseOutput ? JSON.parse(course?.courseOutput) : {}

  return (
    <div className="flex flex-col ">
      

      <div className="md:px-6 md:mx-0 mx-2 px-2 py-8 border shadow-lg rounded-xl bg-white lg:w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-2xl">
                {course?.courseOutput?.CourseName  || "Untitled Course"}
              </h1>
              <EditBasicCourseInfo course={course} />
            </div>

            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              {course?.courseOutput?.Description || "No description provided yet."}
            </p>

            <div className="flex items-center gap-2 text-blue-500 font-medium mt-4">
              <TbCategory className="text-xl" />
              <span>{course?.category || "Uncategorized"}</span>
            </div>
<Link href={'/course/'+course.courseId+"/start"}>

            <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600 mt-6 w-full text-white font-semibold py-2 rounded-md transition">
              Start Course
            </Button>
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <label htmlFor="upload-image" className="text-center">
              <Image
                className="rounded-2xl object-contain h-[250px]  p-2"
                alt="Course Image"
                src={loading ? placeholder : (firebaseImage || placeholder)}
                width={400}
                height={300}
              />
              <Input
                onChange={handleImageUpload}
                id="upload-image"
                className="opacity-0"
                type="file"
              /> {loading ? <div>Upload The Banner/Image</div>:<div></div>}
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BasicCourseLayout;
 