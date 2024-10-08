//@ts-nocheck
"use client"
import React from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import Image from "next/image";
import { useState } from "react";
import { useCallback } from 'react';
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { useContext } from 'react';
import { Context } from '@/app/components/UserProvider';
import { IoHeartOutline } from "react-icons/io5";
import Logpop from '@/app/components/Logpop';
import { AiFillHeart } from "react-icons/ai"
import Register from '@/app/components/Register';
import Super from '@/app/components/Super'
import Login from '@/app/components/Login';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Filter from '@/app/components/Filter';
import { useParams } from 'next/navigation';
import {TbMountain, TbPool} from 'react-icons/tb'
import Map from '@/app/components/Map';
import axios from 'axios';
import { IoIosHeart } from "react-icons/io";
import Rent from '@/app/components/Rentmodal';
import { AiOutlineHeart } from "react-icons/ai";
import{DateRange} from'react-date-range';
import dynamic from 'next/dynamic';
import Iteminfo from '@/app/components/Iteminfo';
import { DateRangePicker } from 'react-date-range';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';

import toast from 'react-hot-toast';
const Page = () => {




  
 const Iteminfo = dynamic(() => import('@/app/components/Iteminfo'), { ssr: false });

  useEffect(() => {


    
    
    
    

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);
    
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
            break;
          }
        }

      }, [])
        















    const [openlog, setopenlog] = useState(false);
    const [login, setlogin] = useState(false);
    const [user, setuser] = useState(null)
    const [registerpop, setregisterpop] = useState(false)
    const [rent, setrent] = useState(false);
    const [userinfo, setuserinfo] = useState(null);
    const [listings, setlistings] = useState([])
    
    const router =useRouter();
  const params=useParams();
const id=params.listingId ;
let reservations:Date[]=[]
const context = useContext(Context);

// Check if the context is defined
if (!context) {
  throw new Error('MyComponent must be used within a UserProviders');
}

const { userInfo } = context;

const [item, setitem] = useState<any[]|null>(null)
useEffect(() => {

    axios.post('/api/view',{id}).then((re)=>{setitem(re.data.item); setuser(re.data.users);   }).catch((e)=>{ throw e})


}, [])

// const initialDateRange={
//   starDate: new Date(),
//   endDate:new Date(),
//   key:'selection'
// }

// let dates:Date[]=[]

// reservations.forEach((reservation)=>{
//   const range=eachDayOfInterval({
//     start:new Date(reservation.startDate),
//     end:new Date(reservation.endDate)
//   });
//   dates=[...dates,...range];
//    return dates
// })

// const[loading,setloading]=useState(false);
// const[totalPrice,settotalprice]=useState("")
// const[dateRange,setdaterange]=useState(initialDateRange)

//  const onCreatereservation=useCallback(()=>{
// axios.post('/api/reservation',{totalPrice,startDate:dateRange.starDate,endDate:dateRange.endDate,listingId:listing?.id}).then(()=>{toast.success('Listing reserved');setdaterange(initialDateRange); router.refresh();}).catch((e)=>{toast.error('something went wrong.');}).finally(()=>{setloading(false);})

//  },[])
//  useEffect(() => {
//    if(dateRange.starDate&&dateRange.endDate){
//     const dayCount=differenceInCalendarDays (dateRange.endDate,dateRange.starDate);
//    }
 
//    if(dayCount&&listing.price){
//     settotalprice(dayCount=listing.price);
//    }
//    else{settotalprice(listing.price);}
  
//  }, [dateRange,listing.price])
const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);

 
 let value
 
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }


  return (
      
<>
  


<div className="w-screen overflow-x-hidden">
  {/* Main container with full-screen height */}
  <div className="h-full relative flex justify-center items-center">
    {/* Register pop-up */}
    <div className={`transition-all opacity-0 w-full h-full absolute z-40 ${registerpop && 'opacity-100'}`}>
      {/* Add your Register component content */}
    </div>
  </div>

  {/* Rent pop-up */}
  <div className="w-full h-full relative flex justify-center items-center">
    <div className={`transition-all opacity-0 w-full h-full absolute z-40 ${rent && 'opacity-100'}`}>
      {(rent && userInfo) && (
        <Rent 
          login={login} 
          listings={listings} 
          register={rent} 
          setlistings={setlistings} 
          setregister={setrent}
        />
      )}
    </div>
  </div>

  {/* Login pop-up */}
  <div className="w-full h-full relative flex justify-center items-center">
    <div className={`transition-all opacity-0 w-full h-full absolute z-40 ${login && 'opacity-100'}`}>
      {/* Add your Login component content */}
    </div>
  </div>

  {/* Header (Fixed) */}
  <div className="border-b p-3 px-4 flex justify-between fixed top-0 left-0 z-30 bg-white w-full">
    <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium" onClick={() => { router.push('/') }}>
      <FaAirbnb size={35} />
      Airbnb
    </div>
 {/* Dialog Trigger for larger and smaller screens */}
 <div className="md:flex hidden border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between " >
      <div className="border-r px-3 hidden items-center cursor-pointer md:flex">Anywhere</div>
      <div className="border-r px-3 flex items-center cursor-pointer">Anywhere</div>
      <div className="pl-3 text-gray-500 hidden items-center cursor-pointer md:flex md:w-auto">Add Guest</div>
      <div className="text-rose-700"><IoSearchCircle size={35} /></div>
    </div>
    <div  onClick={()=>{router.push('/')}} className="flex  items-center md:hidden rounded-full bg-white shadow-md px-2">
      Search 
      <div className="text-rose-700"><IoSearchCircle size={35} /></div>
    </div>
    <div className="flex items-center gap-4 relative">
      <div 
        className="h-full hidden items-center text-sm font-medium md:flex hover:bg-neutral-200 rounded-full md:px-2 px-0 cursor-pointer transition-all"
        onClick={() => { !userInfo ? router.push('/login') : setrent(true) }}
      >
        Airbnb your home
      </div>
      <Logpop setopenlog={setopenlog} setlogin={setlogin} userinfo={userInfo} setregister={setregisterpop} />
    </div>
  </div>

  {/* Item or Super component */}
  {item ? (
    <Iteminfo
      item={item}
      reviews={item.reviews}
      id={item.id}
      user={user}
      description={item.descriptiom}
      image={item.imagesrc}
      guest={item.guestcount}
      room={item.roomcount}
      bathrooms={item.bathroomcount}
      locations={item.locationValue}
      title={item.title}
      category={item.category}
      price={item.price}
    />
  ) : (
    <Super />
  )}
</div>

 
   </>
  )
}

export default Page
