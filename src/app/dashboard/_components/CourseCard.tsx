"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { IoReaderOutline } from 'react-icons/io5'
import DropdownOptions from './DropdownOptions'
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'


const CourseCard = ({item}) => {
    const router = useRouter()

    const [opendailog, setOpendailog] = useState(false)
    const [loading, setLoading] = useState(false)


    // useEffect(()=>{
    //   CourseList.courseOutput
    // },[CourseList])

    const handleDelete = async ()=>{
      setLoading(true)
      // console.log("handle delete is clicked")
      

     const resp =  await db.delete(CourseList).where(eq(item.id,CourseList.id))

     if(resp){
      setLoading(false)
       setOpendailog(false)
     }
     

    }

    const handleOnDelete = async () =>{
      setOpendailog(true)
    }
  return (
    <div
    // onClick={()=>router.replace(`createcourse/${item.courseId}`)}
      key={item.courseId}
      className="shadow-md rounded-xl overflow-hidden p-4 bg-white hovr:shadow-lg transition-all duration-200 hove
    r:scale-[1.02] cursor-pointer"
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
          <DropdownOptions handleOnDelete={handleOnDelete}>
          <FaEllipsisVertical className='cursor-pointer' />

          </DropdownOptions>

        </h2>
        <p className="text-sm text-gray-500">{item.courseOutput.Topic}</p>
        <div className="flex justify-between text-xs text-white mt-2">
          <span className="bg-blue-500 px-2 py-0.5 rounded flex gap-1 items-center"><IoReaderOutline className="font-semibold" />
          Chapters: {item.courseOutput.NoOfChapters}</span>
          <span className="bg-blue-500 px-2 py-0.5 rounded">{item.courseOutput.Level}</span>
        </div>
      </div>
<AlertDialog open={opendailog} onOpenChange={setOpendailog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your course
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className='cursor-pointer' onClick={()=>setOpendailog(false)}>Cancel</AlertDialogCancel>
      <Button onClick={handleDelete} variant={"destructive"} className='bg-blue-500 text-white font-semibold cursor-pointer'> {loading ? <Loader2Icon className='animate-spin'/> :"Continue" } </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  )
}

export default CourseCard