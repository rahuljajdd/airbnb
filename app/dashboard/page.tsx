//@ts-nocheck
"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import {  AvatarFallback, AvatarImage } from "@/app/ui/avatar"
import { Component } from '../components/ReservationChart';
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { format } from 'date-fns';
import { Button } from "@/app/ui/button"
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card"
import { Avatar } from '@radix-ui/react-avatar';
import { signIn, useSession } from 'next-auth/react';
import Question from '../components/Question';
import Answer from '../components/Answer';
import Edituser from '../components/Edituser';
import ReservationTable from '../components/ReservationTable';
import Logpop from '../components/Logpop';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '../components/UserProvider';
import { Dialog, DialogContent, DialogDescription } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
const Page = () => {
  const [reservation, setreservation] = useState([])


  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
const router=useRouter();

  useEffect(() => {
  
    if(userInfo){
      
      axios.post('api/dashboard' ,{userid:userInfo?.email}).then((res)=>{setreservation(res.data)})
    }
      }, [userInfo])




  return (
    <>


{!userInfo&&<Dialog open={true}>
  <DialogContent>
    <DialogTitle>Sorry Not Logined</DialogTitle>
    <DialogDescription> First login to acess the dashbord</DialogDescription>
    <Button onClick={()=>{router.push('/auth/sign-up')}}>Signup</Button>
  </DialogContent>
  </Dialog>}


    <div className="">
  
  <div className=" border-b w-full p-3 px-4 bg-white flex justify-between fixed z-40  shadow-sm">

    
    <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " ><FaAirbnb size={35}></FaAirbnb> airbnb</div>
   
    <div className="flex items-center gap-4 relative ">
      <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{ console.log("hello")}}> Airbnb your home</div>
<Logpop></Logpop>

    </div>
    </div>
  
    </div >
    
      <div className=' pt-24 p-3 flex-none md:flex  w-screen md:w-auto justify-between'>
    <div className='mb-4 md:mb-0 w-screen md:auto'>
    <div className='text-2xl font-semibold'>Dashboard</div>
     <div className='text-sm text-gray-500 '>your buissness anylitics</div></div>
      
    <Edituser></Edituser>
      
      </div>

  <div className=' md:flex w-screen  justify-between '>

<div className=' w-screen md:w-[900px]'>
  
<div className='flex w-[620px] md:w-[900px]' >

      <Card className='md:w-full w-64   h-40 m-5'>
  <CardHeader>
    <CardTitle>Total Revenue</CardTitle>

  </CardHeader>
  <CardContent className=''>
<div className='text-3xl font-bold'>${reservation.reduce((total,item)=>{return total+(Number(item.totalprice))},0)}</div>
  </CardContent>
 
</Card>
      <Card className=' md:w-full  w-64  h-40 m-5'>
  <CardHeader>
    <CardTitle>Total Reservations</CardTitle>

  </CardHeader>
  <CardContent className=''>
<div className='text-3xl font-bold'>{reservation.length}</div>
  </CardContent>
 
</Card>

</div>

  <div className='md:p-4  md:m-7  mx-4 md:w-[900px] w-[620px]   bg-white border rounded-xl shadow '>


<Component reservations={reservation} ></Component>


  </div>
  <div className='md:px-0  '>
    
  <div className='p-4 md:w-[900px] w-[620px]   md:m-7 mx-4 mt-4  border rounded-lg shadow '>

<ReservationTable reservation={reservation}></ReservationTable>

  </div>
  </div>

</div>

<div>

  
      <Card className='md:w-[650px] w-[620px] mx-4 h-96 md:m-5 mt-4 md:mr-10 '>
  <CardHeader>
    <CardTitle>Recent Reservations</CardTitle>

  </CardHeader>
  <CardContent className=''>



  {(reservation[0]===1)&&<div>
  
  {[1,1,1,1,1,1,1].map((item)=>{return( <div> <Skeleton className='w-[550px] mt-4 h-32'></Skeleton> </div>)})}
    
    
    </div>}



{reservation.length===0&&<div className='flex w-full h-full justify-center items-center'>Sorry no reservaton on your listing Yet </div>}


    {(reservation[0]!==1&&reservation.length>0)&&reservation.map((item)=>{
      return(



<div className=''>



<div className='flex gap-4 items-center '>
  <div className='  h-20  w-32  flex items-center justify-center'>

<img className='rounded-full w-16 h-16' src={item.user.image}></img>
  </div>
<div>


<div className='text-lg font-medium'> {item.user.name}</div>
<div className='text-gray-600'> {item.user.email}</div>
</div>
<div className='flex-col '>

<div className='text-2xl font-bold flex justify-end relative right-0 w-44' >+${item.totalprice}</div>

<div className='text-sm text-gray-600 mt-2 w-full float-right flex justify-end'>{format(new Date(item.createdat), 'yyyy-MM-dd')} </div>
</div>
</div>
  
</div>




      )
    })}


  </CardContent>
 
</Card>
      


   <Answer></Answer>
</div>





  
  </div>
    



  <div>

  </div>
   
     </>
  )
}

export default Page