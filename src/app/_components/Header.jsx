import Image from 'next/image'
import React from 'react'
import logo from "../../../public/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Header = () => {
  return (
    <div className=' flex justify-between items-center md:mx-3 shadow mr-3'>
        <Image alt='logo' className='bg-red-500' src={logo} width={100 } height={100}/>
        {/* <h1>Still Learning</h1> */}
        <Link href={"/dashboard"}>
        
        <Button className='bg-blue-500 text-white cursor-pointer'>Get Started</Button>
        </Link>
    </div>
  )
}

export default Header