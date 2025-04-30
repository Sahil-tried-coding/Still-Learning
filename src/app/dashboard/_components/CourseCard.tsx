import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { IoReaderOutline } from 'react-icons/io5'

const CourseCard = ({item}) => {
    const router = useRouter()
  return (
    <div
    onClick={()=>router.replace(`createcourse/${item.courseId}`)}
      key={item.courseId}
      className="shadow-md rounded-xl overflow-hidden p-4 bg-white hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
    >
      <Image
        className="mx-auto rounded-md object-cover w-full h-[150px]"
        src={item.courseImage || "/video-content-op.png"}
        alt="Course"
        width={300}
        height={200}
      />
      <div className="mt-4 space-y-1">
        <h2 className="font-bold text-lg text-gray-800 flex justify-between items-center ">
          {item.courseOutput.CourseName}
          <FaEllipsisVertical />

        </h2>
        <p className="text-sm text-gray-500">{item.courseOutput.Topic}</p>
        <div className="flex justify-between text-xs text-white mt-2">
          <span className="bg-blue-500 px-2 py-0.5 rounded flex gap-1 items-center"><IoReaderOutline className="font-semibold" />
          Chapters: {item.courseOutput.NoOfChapters}</span>
          <span className="bg-blue-500 px-2 py-0.5 rounded">{item.courseOutput.Level}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseCard