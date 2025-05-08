"use client"
import { Userinput } from '@/app/_context/Userinput'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const Topic_description = () => {


    const {userCourseInput, setUserCourseInput} = useContext(Userinput)
  


    const handleTopicInput = (fieldName,value) =>{

      setUserCourseInput(prev=>({
        ...prev,
        [fieldName]:value
      }))
    }

    console.log(userCourseInput)



  return (
    <div className='md:mx-20 mt-16 mx-6 lg:px-44 lg:mt-12 flex flex-col gap-8'>
      <div>
        <label  className=' font-semibold capitalize'> {`Type something you want a course on  maybe "TypeScript", maybe "Yoga"… or maybe how to finally finish what you start. `}
          <Input required={true} value={userCourseInput?.topic || ""} name='topic' onChange={e=>handleTopicInput(e.target.name,e.target.value)}  className='mt-3 capitalize font-semibold text-lg' placeholder='Enter a Topic '/>
        </label>
      </div>
      <div>
        <label className=' font-semibold'> {`Want the course to be more on point? Add extra details (totally optional).`}
          <Textarea required value={userCourseInput?.description} name='description' onChange={e=>handleTopicInput(e.target.name,e.target.value)} className='mt-3 capitalize font-semibold text-lg'  placeholder='Bit Details '/>
        </label>
      </div>
    </div>
  )
}

export default Topic_description