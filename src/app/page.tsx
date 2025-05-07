import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import { SmoothCursor } from '@/components/ui/smooth-cursor'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header/>
      <Hero/>
      <SmoothCursor />
    </div>
  )
}

export default Home