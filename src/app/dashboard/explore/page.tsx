"use client"
import React, { useState } from 'react'
import { techCareers } from './carrerDB'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Explore = () => {
  const [career, setCareer] = useState('')
  console.log(career)
  return (
    <div className=''>
      <div className='flex items-center gap'>
      <Image src={"/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp"} width={100} height={100} alt='logo' />
      <h1 className='mt-4  capitalize font-semibold text-2xl text-center whitespace-nowrap'>Confused About Career options and what skills required? here's the breakdown to learn</h1>

      </div>
      {/* career.toLowerCase() == item.title.toLowerCase() */}
      <div className='flex gap-2'>
      <Input onChange={(e)=>setCareer(e.target.value)} value={career} type='text' placeholder='Search Here' />
      {/* <Button variant={"outline"}>Search </Button> */}
      </div>
            {
        techCareers.map((item,index)=>(
          <div className='pl-12 flex flex-col gap-1.5 mt-4 border-b pb-4.5' key={index}>


  <h1 className='font-semibold text-xl text-blue-500'>{item.title}</h1>

            
            <h1 className='text-sm'>{item.description}</h1>
            <div className='flex gap-2.5 flex-wrap'>
            {
              item.skills.map((skills,index)=>(
                <h1 className='border-blue-400 hover:bg-black hover:text-white cursor-pointer py-1.5 px-3.5 text-black font-semibold border-2 rounded-xl' key={index}>{skills}</h1>
              ))
            }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Explore