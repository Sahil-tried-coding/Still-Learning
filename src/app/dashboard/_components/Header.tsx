import React from 'react'
import logo from "../../../../public/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp";
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
// import { UserButton } from '@clerk/nextjs';

const SidebarHeader = () => {
  return (
    <div className='flex justify-between w-full px-2 md:px-10 items-center'>
        {/* <Link href="/"><Image alt='logo' width={60} height={60} src={logo} /></Link> */}
        <div className="flex items-center md:px-4  gap-0.5 mt-3.5">
                  <Image src={logo} alt="logo" width={50} height={50} />
                  <h1 className="font-semibold text-xl whitespace-nowrap">
                    Still Learning
                  </h1>
                </div>
        {/* <UserButton/> */}
        <div className='flex items-center gap-4 mt-3.5'>
          <Link href={"/dashboard"}>
        <Button variant={"outline"} className='cursor-pointer text-blue-500  font-semibold'>Dashboard</Button></Link>
        <UserButton />
        </div>
        
    </div>
  )
}

export default SidebarHeader