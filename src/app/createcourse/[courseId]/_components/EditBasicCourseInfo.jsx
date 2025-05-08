import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { Loader2Icon } from 'lucide-react'
import { eq } from 'drizzle-orm'


const  EditBasicCourseInfo = ({course}) => {


  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
const [loading, setloading] = useState(false)

  useEffect(()=>{

    setCourseName(course?.courseOutput?.CourseName)
    setDescription(course?.courseOutput?.Description)
  },[course])

  const updateCourseInfo = async () =>{
    setloading(true)
    course.courseOutput.CourseName = courseName
    course.courseOutput.Description = description
    
      await db.update(CourseList).set({
      courseOutput:course?.courseOutput
    }).where(eq(CourseList.id,course.id))
    setloading(false)
    

  

  }







  return (
    <div >
        <Dialog >
  <DialogTrigger><Image src={"/edit.png"} alt="edit" height={25} width={25}/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center md:mt-0 mt-3'>Edit the Course Name and Description</DialogTitle>
      <DialogDescription className='mt-2 text-left md:mt-0 m' >
        <label   htmlFor="">
          Name 
          <Input onChange={(e)=>setCourseName(e.target.value)} name='courseName' className='my-2' defaultValue={course?.courseOutput?.CourseName} type="text" />
        </label>
        <label htmlFor="">
          Description 
          <Textarea onChange={(e)=>setDescription(e.target.value)} name='courseDesc'  defaultValue={course?.courseOutput?.Description} className='my-2 h-40' />
        </label>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={updateCourseInfo} className='bg-blue-500 text-white font-semibold'>{ loading? <Loader2Icon className='animate-spin'/> : 'Update'}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default EditBasicCourseInfo