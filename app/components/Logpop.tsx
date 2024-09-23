//@ts-nocheck
"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { RiAccountCircleFill } from "react-icons/ri";
import { signOut } from 'next-auth/react';
import { SignOutButton,useUser } from '@clerk/nextjs';
import { RxHamburgerMenu } from 'react-icons/rx';

import { Context } from './UserProvider';
import { useContext } from 'react';
import { useClerk } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"
import Avatar from './Avatar';


const Logpop = ({setregister,setopenlog,setlogin,userinfo}:any) => {
  const context = useContext(Context);
const{signOut}=useClerk()
  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
  const router=useRouter();
  
  return (
    




<DropdownMenu>
  <DropdownMenuTrigger><Avatar></Avatar></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/dashboard')}}>My Dashboard </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/trips')}}>My trips </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('fav')}}>My favourites </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/reservations');}}>My resvervations </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2 border-b " onClick={()=>{router.push('/myproperties');}}>My Properties </div></DropdownMenuItem>
    <DropdownMenuSeparator />
{(!userInfo)? <><DropdownMenuLabel> <div className="cursor-pointer hover:bg-neutral-100 p-2 " onClick={()=>{ router.push('/auth/sign-in')}}>Login</div></DropdownMenuLabel><DropdownMenuLabel> <div className="cursor-pointer hover:bg-neutral-100 p-2 w-24 " onClick={()=>{router.push('/auth/sign-up')}}>SiginUp</div> </DropdownMenuLabel>  </> : <> <DropdownMenuLabel><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={async()=>{ await signOut();router.push('/auth/sign-up') }}>LogOut</div></DropdownMenuLabel></>}

  </DropdownMenuContent>
</DropdownMenu>

 



 
 



    
  )
}

export default Logpop
