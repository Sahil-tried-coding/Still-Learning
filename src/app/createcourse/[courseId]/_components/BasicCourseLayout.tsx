"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import placeholder from "../../../../../public/placeholder.png"; // Default placeholder
import { TbCategory } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import EditBasicCourseInfo from "./EditBasicCourseInfo";
import { Input } from "@/components/ui/input";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import upload from "@/lib/upload";
import { Userinput } from "@/app/_context/Userinput";
import Upload from "@/lib/Upload";

const BasicCourseLayout = ({ course }) => {

  const [selectedFile, setSelectedFile] = useState<string>()

 const [firebaseImage,setFirebaseImage] = useState("")

  const handleImageUpload = async (event) =>{

    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file))

    const fileName = Date.now() + '.jpg'

    const storageRef =ref(storage,'images/'+ fileName)

    await uploadBytes(storageRef,file).then((snapshot)=>console.log("file uploaded successfully"))
        getDownloadURL(storageRef).then((downloadURL) => {
          setFirebaseImage(downloadURL)
          // console.log(downloadURL)
        })

    // const fileUrl = await Upload(event.target.files[0]);

    // console.log("this is file url",fileUrl)
  }

//  const {fireBaseImage,setFirebaseImage} = useContext(Userinput)




  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h1 className="font-bold text-center text-4xl text-blue-600 tracking-wide mb-6">
        Course Layout
      </h1>

      {/* Course Card */}
      <div className="px-6 py-8 border shadow-lg rounded-xl bg-white  lg:w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-2xl">
                {course?.courseOutput?.CourseName || "Untitled Course"}
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

            <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600 mt-6 w-full text-white font-semibold py-2 rounded-md transition">
              Start Course
            </Button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center">
<label htmlFor="upload-image">
            <Image
              className="rounded-2xl object-contain bg-gray-100 p-2"
              alt="Course Image"
              src={firebaseImage? firebaseImage : "/placeholder.png"}
              // src={selectedFile? selectedFile : "/placeholder.png"}
              // src={course?.courseOutput?.ImageUrl || "/placeholder.png"}
              width={400}
              height={300}
            />
            <Input onChange={handleImageUpload} id="upload-image" className="opacity-0" type="file"/>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BasicCourseLayout;
