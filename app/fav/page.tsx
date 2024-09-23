
//@ts-nocheck
"use client"
import React, { useEffect, useInsertionEffect } from 'react'

import Card from '../components/Card';
import Image from "next/image";
import { useState } from "react";
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import Logpop from "../components/Logpop";
import Register from "../components/Register";
import ClientOnly from "../components/ClientOnly";
import Login from "../components/Login";
import Categories from "../components/Categories";
import { useRouter } from "next/navigation" ;
import Rentmodal from "../components/Rentmodal";
import Rent from "../components/Rentmodal";
import Listings from "../components/Listings";
import axios from "axios";
import { useContext } from 'react';
import Avatar from '../components/Avatar';
import Trips from '../components/Trips';
import Reservation from '../components/reservations';
import Properties from '../components/properties';
import { Context } from '../components/UserProvider';
const Page = () => {

    const [openlog, setopenlog] = useState(false);
    const [login, setlogin] = useState(false);
    const [registerpop, setregisterpop] = useState(false)
    const [rent, setrent] = useState(false);
    const [userinfo, setuserinfo] = useState(null);
    const [properties, setproperties] = useState([])
    const router =useRouter();

    const context = useContext(Context);

    // Check if the context is defined
    if (!context) {
      throw new Error('MyComponent must be used within a UserProviders');
    }
  
    const { userInfo } = context;

   useEffect(() => {
   

axios.post('api/favourites',{user:userInfo}).then((res)=>{setproperties(res.data);}).catch(e=>{console.log(e)})

   }, [userinfo])
   
    

  return (
    <SessionProvider>
    <div className="">
    {registerpop&&<Register setregister={setregisterpop} setuserinfo={setuserinfo}></Register>}
    
  {login&&<Login setregister={setlogin}></Login>}
  <div className=" border-b w-full p-3 px-4 bg-white flex justify-between fixed z-40  shadow-sm">
    
    <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " onClick={()=>{router.push('/')}}><FaAirbnb size={35}></FaAirbnb> airbnb</div>
    <div className="flex border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between ">
    <div className="border-r px-3 hidden items-center  cursor-pointer md:flex ">anywhere</div>
    <div className="border-r px-3 flex items-center  cursor-pointer">anywhere</div>
    <div className=" pl-3 text-gray-500 hidden items-center  cursor-pointer  md:flex md:w-auto ">Add Guest</div>
    <div className="text-rose-700"><IoSearchCircle size={35}/> </div>
    </div>
    <div className="flex items-center gap-4 relative ">
      <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{setrent(true); console.log("hello")}}> Airbnb your home</div>
      
      
   <Logpop setopenlog={setopenlog} setlogin={setlogin} userinfo={userinfo} setregister={setregisterpop}></Logpop>
    </div>
    </div>
  
    </div>
    
      <div className=' pt-24 p-3'>
    
    <div className='text-2xl font-semibold'>My properties</div>
     <div className='text-sm text-gray-500'>your listings</div>
      </div>

  
  
<div className='flex flex-wrap  w-full mx-auto  '>


<>
 


 {/* { (properties?.length===0)&& <>  <div  className=' min h-96 flex justify-center items-center  border'><div className='flex flex-col justify-center items-center gap-3'>
         <div className='text-2xl font-medium'>No exact matches</div>
         <div className='text-gray-500'>Try changing or removing some of your filters</div>
         <button className='text-sm p-3 border-2 border-black rounded-md ' onClick={()=>{router.push('/');}}>Remove all filters</button>
       </div>  </div></>} */}
 {(properties?.length===0)&&<> <div className='w-full h-96 text-2xl text-neutral-800 font-medium flex justify-center items-center flex-col '>No properties  created yet<div className='text-base font-normal text-neutral-500'>Please make reservations first</div></div>
   </>}
 
 <div className='flex flex-wrap '>
 
       {(properties===null)&&[1,1,1,1,1,1,1,1,1,11,1].map((item)=>{return(<div className='mx-auto'><SkeletonCard></SkeletonCard></div>)})}
 
 {properties?.map((item:any)=>{ 
 
 
 
 return(
 <>
 
 <Card setproperties={setproperties} items={item} title={item.title}  description={item.description} category={item.category} location={item.locationValue} roomcount={item.roomCount} guestcount={item.guestCount} bathroomcount={item.bathroomCount} price={item.price} imagesrc={item.imagesrc.split('=')[0]} id={item.id} delisting={true} cancelreservation={false} ></Card>
 
 </>
 
 )
     
 })}
 
 </div>
 
 
   </>  


</div>
  
    



  <div>

  </div>
   
     </SessionProvider>
    
  )
}

export default Page