import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const DropdownOptions = ({children,handleDelete}) => {
  return (
    <DropdownMenu >
  <DropdownMenuTrigger className='cursor-pointer'>{children}</DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
    {/* <DropdownMenuSeparator /> */}
    <DropdownMenuItem className='cursor-pointer' onClick={()=>handleDelete}>Delete</DropdownMenuItem>
    {/* <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default DropdownOptions