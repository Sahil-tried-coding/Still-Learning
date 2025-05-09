import React from 'react'
import Sidebar from './_components/Sidebar'

const DashboardLayout = ({children}) => {
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