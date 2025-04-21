"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Addcourse = () => {


    const {user} = useUser()
  return (
    <div className='flex justify-between'>
        <div>
            <h1 className='text-2xl'>Hello ,<span className='font-semibold'>{user?.fullName}</span></h1>
            <p>Create New Course With Ai 🚀</p>
        </div>

        <Link href={"createcourse"}>
        
         <Button  className='bg-blue-500 text-white font-semibold'>+ Course with Ai</Button></Link>
    </div>
  )
}

export default Addcourse