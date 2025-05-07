"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import logo from "../../../../public/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HomeItem = {
  id: number;
  name: string;
  path: string;
  icon: ReactNode;
};

const Sidebar = () => {

  const [openSidebar, setOpenSidebar] = useState(true)

  const menuItems: HomeItem[] = [
    {
      id: 1,
      name: "Home",
      path: "/dashboard",
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      name: "Explore",
      path: "/dashboard/explore",
      icon: <IoSearchOutline />,
    },
    {
      id: 3,
      name: "Create Course",
      path: "/createcourse",
      icon: <MdOutlineCreateNewFolder /> ,
    },
    {
      id: 4,
      name: "Logout",
      path: "/dashboard/logout",
      icon: <RiLogoutBoxRLine />,
    },
  ];

  const pathname = usePathname();

  return (
    <div>
      <Image onClick={()=>setOpenSidebar(!openSidebar)} className="absolute top-5.5 left-4 cursor-pointer " src={"/bars.png"} width={35} height={35} alt="close" />
      {
      openSidebar && <div className="h-screen backdrop-blur-3xl w-screen relative md:w-[264px] border-r bg-white shadow flex flex-col justify-between ">
      <Image onClick={()=>setOpenSidebar(!openSidebar)} className="absolute top-3 right-3 cursor-pointer " src={"/close.png"} width={20} height={20} alt="close" />
      {/* Top Section */}
      <div>
        {/* Logo & Title */}
        <div className="flex items-center px-4 py-6 gap-2 mt-3.5">
          <Image src={logo} alt="logo" width={50} height={50} />
          <h1 className="font-semibold text-xl whitespace-nowrap">
            Still Learning
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col px-5 gap-1.5 mt-16">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center gap-3 px-6 py-3 text-lg cursor-pointer hover:bg-blue-400 hover:text-white transition rounded-md ${
                  pathname === item.path ? "bg-blue-400 text-white" : ""
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Progress Section */}
      {/* <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium text-black">2</span> of 5 courses created
        </p>
        <div  className="h-2 bg-gray-200 w-full">
          <div className="h-2 bg-red-500 w-[40%]"></div>
        </div>
        <p className="text-xs text-red-500 mt-2">
          Upgrade your plan for unlimited course generation
        </p>
      </div> */}
    </div>
    }
    </div>
  );
};

export default Sidebar;
