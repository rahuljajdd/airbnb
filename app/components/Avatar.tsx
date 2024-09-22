

"useclient"

import React, { useContext } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"
import { useClerk, useSession, useUser } from '@clerk/nextjs';
import { Context } from './UserProvider';

const Avatar:React.FC<any>= ({setopenlog,openlog,setlogin,setregister}) => {
  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
    const router=useRouter();
  return (
    <>




       <div className="  border p-2 flex items-center rounded-full text-gray-500 gap-1 cursor-pointer  hover:shadow duration-100" onClick={()=>{setopenlog(!openlog)}} ><div className="hidden md:block" ><RxHamburgerMenu></RxHamburgerMenu></div><div className=' hidden lg:block text-neutral-700'>{userInfo?.username}</div><RiAccountCircleFill size={30}></RiAccountCircleFill></div>
    </>
  )
}

export default Avatar
