"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const ChapterCard = ({chapter,index}) => {


    const [isSelected, setIsSelected] = useState()


  return (
    <div className='cursor-pointer border-b-2  p-3'>
        <div className='flex cursor-pointer items-center gap-2 '>
        <div className=' w-14  '>
            <h1 className='h-8 cursor-pointer w-8 p-1 rounded-full bg-blue-500 text-white  text-center'>{index+1}</h1>
        </div>
        <div className='w-full cursor-pointer'>
            <h1 className='text-md cursor-pointer font-semibold'>{chapter?.ChapterName}</h1>
            <h1 className='flex gap-2 cursor-pointer text-sm items-center mt-1'> <Image src={'/clock.png'} width={20} height={15} alt='clock' /> {chapter?.Duration}</h1>
        </div>
    </div>
    </div>
  )
}

export default ChapterCard