"use client"
import { Userinput } from '@/app/_context/Userinput'
import { SelecteCategory } from '@/app/_shared/SelecteCategory'
import Image from 'next/image'
import React, { useContext } from 'react'





const Category = () => {

  const {userCourseInput, setUserCourseInput} = useContext(Userinput)




  const handleCategory = (category) =>{

    setUserCourseInput(prev  =>({
      ...prev,
      category:category
    }))
  }

  return (
    <div>
        
        <div className='md:mt-12 mt-6 md:flex grid items-center justify-center gap-5 
        '>
            {SelecteCategory.map((item,index)=>(
                <div key={index}>
                    <div onClick={()=>handleCategory(item.name)} className={`md:w-[250px] w-[300px]  cursor-pointer hove:border   flex flex-col items-center py-3 ${userCourseInput?.category === item.name && "border-blue-700 border-2 bg-blue-100"}`}>

                    <Image className='w-[120px]  h-[120px] p-2'  alt='a' src={item.icon}/>
                    <h1 className='font-semibold'>{item.name}</h1>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Category