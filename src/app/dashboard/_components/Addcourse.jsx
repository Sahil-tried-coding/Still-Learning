"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AddCourse = () => {
  const { user } = useUser();

  return (
    <section className=" flex flex-col md:flex-row items-start md:items-center justify-between px-20 md:px-12 lg:px-20 py-6 bg-white rounded-xl shadow-sm">
      <div>
        <h1 className="text-2xl font-medium text-gray-800">
          Hello,{" "}
          <span className="font-semibold text-blue-600">
            {user?.fullName || "Instructor"}
          </span>
        </h1>
        <p className=" md:block hidden pr-6 text-sm text-gray-500 mt-1 whitespace-nowrap">
          Ready to create your next course with AI? 🚀
        </p>
      </div>

      <Link href="/createcourse" passHref>
        <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-all duration-200">
          + Create Course with AI
        </Button>
      </Link>
    </section>
  );
};

export default AddCourse;
