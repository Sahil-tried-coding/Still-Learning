import React, { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import SidebarHeader from './_components/Header'

const DashboardLayout = ({children}:ReactNode) => {
  return (
    <div className='flex'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full'>
          {/* <SidebarHeader/> */}
       <div className='p-3'>
       {children}
       </div>

        </div>
    </div>
  )
}

export default DashboardLayout