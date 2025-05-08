"use client"

import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Shimmer from "./Shimmer";



const UserCourseList = () => {
  const [allCourse, setAllCourse] = useState([]);
  const { user } = useUser();


  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getAllCourses();
    }
  }, [user]);

  const getAllCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""));

      if (result.length > 0) {
        setAllCourse(result );
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <div className="px-4 md:px-20">
      <h1 className="md:mt-10 font-semibold text-blue-600 text-center text-xl mt-4">Your Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {allCourse.map((item) => (
<CourseCard key={item.courseId} refreshData={()=>getAllCourses} item={item}/>

        ))}
      </div>

      {allCourse.length === 0 && (
        <Shimmer/>
        // <p className="text-center mt-1 b0 text-gray-400">No courses found yet.</p>
      )}
    </div>
  );
};

export default UserCourseList;
