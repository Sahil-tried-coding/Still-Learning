import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (<div className='flex items-center justify-center sm:bg-amber-600 sm:h-screen'> 
    <SignUp />
  </div>)
}