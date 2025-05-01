import React from 'react'
import logo from "../../../../public/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp";
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
// import { UserButton } from '@clerk/nextjs';

const SidebarHeader = () => {
  return (
    <div className='flex justify-between w-full px-6 items-center'>
        <Link href="/"><Image alt='logo' width={60} height={60} src={logo} /></Link>
        {/* <UserButton/> */}
        <div className='flex items-center gap-4'>
          <Link href={"/dashboard"}>
        <Button className='cursor-pointer bg-blue-500 text-white font-semibold'>Dashboard</Button></Link>
        <UserButton />
        </div>
        
    </div>
  )
}

export default SidebarHeader