import { SignIn, UserButton, UserProfile } from '@clerk/nextjs'
import React from 'react'

const Logout = () => {
  return (
    <div className=' md:px-0 md:py-0 px-40 py-40 md:flex md:gap-4 md:items-center md:justify-center md:h-screen'>

        <UserButton defaultOpen /> 
        {/* <UserProfile />  */}
        {/* <SignIn /> */}
    </div>
  )
}

export default Logout