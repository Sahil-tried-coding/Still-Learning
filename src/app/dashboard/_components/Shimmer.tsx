import React from 'react'

const Shimmer = () => {
    const course:number[] = [1,2,3,4,5,6,7,8,9];
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
        {
            course.map((item,index)=>(
                <div className='flex flex-col justify-between w-[300px] bg-gray-300 h-[250px] px-3' key={index}>
                    <div className="w-full bg-gray-100 mt-2.5 h-[140px]"></div>

                    <div className="flex justify-between mb-6">
                        <div className="bg-gray-200 w-[90px] h-[15px]"></div>
                        <div className="bg-gray-200 w-[90px] h-[15px]"></div>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default Shimmer