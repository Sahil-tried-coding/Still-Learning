import Image from 'next/image'
import React from 'react'
import EditBasicCourseInfo from './EditBasicCourseInfo'

const ChapterDetails = ({course}) => {
  return (
    <div>
        <h1 className="font-semibold text-left text-xl text-blue-500 mt-4.5">Chapters / Modules </h1>

        <div>
            {
                course?.courseOutput?.Chapters?.map((item,index)=>(
                    // main box
                    <div className='shadow-md p-3  justify-between  mt-7 flex items-center' key={index}>

                        <div className='flex gap-3 items-center'>
                            <div className='w-[8%]'>
                        <div className='bg-blue-500 rounded-[100%] w-[35px] text-white font-semibold text-center h-[35px] py-2'>
                            {index+1}
                        </div>

                            </div>

                        <div className='flex flex-col gap-2'>
            
            <div className='font-semibold'>{item.ChapterName} </div>
                            <div className='text-gray-400 text-xs flex-none w-[85%]'>{item.About}</div>
                            <div className='flex items-center gap-1.5'>
                                <Image alt='clock' width={25} height={25} src={"/clock.png"}/>
                                {item.Duration}
                            </div>
                        </div>
                        </div>
                        <div className='min-h-[30px] min-w-[30px]'>
                        <Image alt='clock' width={35} height={35} src={"/checkmark.png"}/>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ChapterDetails