import React from 'react'
import logo from "../../../../public/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp";
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
// import { UserButton } from '@clerk/nextjs';

const SidebarHeader = () => {
  return (
    <div className='flex justify-between w-full px-6'>
        <Link href="/"><Image alt='logo' width={60} height={60} src={logo} /></Link>
        {/* <UserButton/> */}
        
        <UserButton />
        
    </div>
  )
}

export default SidebarHeader