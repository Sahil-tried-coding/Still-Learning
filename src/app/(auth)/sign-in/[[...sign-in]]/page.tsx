import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (<div className='flex items-center justify-center bg-amber-600 h-screen'> 
    <SignIn />
  </div>)
}