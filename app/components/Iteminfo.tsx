//@ts-nocheck
'use client'


import { format } from 'date-fns';
import React, { ReactElement, useEffect } from 'react'
import { TbMountain } from 'react-icons/tb'
import { RiAccountCircleFill } from 'react-icons/ri'
import { string } from 'zod'
import { addDays } from 'date-fns';
import countries from 'world-countries'
import { ScrollArea } from '@/components/ui/scroll-area';
import Categories from './Categories'
import Question from './Question';
import { categories } from './Categories'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from 'leaflet'
import { FaCar } from "react-icons/fa6";
import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert"
import ReactStars from "react-rating-stars-component";
import { FaDog, FaMountain, FaParking, FaTv } from 'react-icons/fa';
import { FaKitchenSet } from 'react-icons/fa6';
import { url } from 'inspector'
import{DateRange} from'react-date-range';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card"
import axios from 'axios'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/ui/avatar"

import { Rating } from 'react-simple-star-rating'
import { useContext } from 'react';
import { Context } from './UserProvider';
import { compareSync } from 'bcrypt'

import { constants } from 'buffer'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from 'next/navigation'
import { GiCrosscutSaw } from 'react-icons/gi'
import { Cross1Icon } from '@radix-ui/react-icons'
import { BiCross } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '@/app/ui/button'

interface info{
    name :string
    guest:number
    room:number
    bathrooms:number
    description:string
    category:string
    title:string
    locations:string
    image:string
    price:number
    id:string

}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"
import { Description } from '@radix-ui/react-dialog';
import { useToast } from '@/hooks/use-toast';
import ReviewSection from './ReviewSection';







const iconMap = {
  dog: {
    key:'pets',
    icon: FaDog,
    name: 'Pets are allowed '
  },
  mountain: {
    key:'view',
    icon: FaMountain,
    name: 'window view'
  },
  parking: {
    key:'parking',
    icon: FaParking,
    name: ' Free Parking'
  },
  tv: {
    key:'tv',
    icon: FaTv,
    name: 'TV'
  },
  kitchen: {
    key:'kitchen',
    icon: FaKitchenSet,
    name: ' Private Kitchen'
  }
};

const IconComponent = ({ iconName }) => {
  const iconInfo = iconMap[iconName];
  if (!iconInfo) return null;

  const { icon: Icon, name } = iconInfo;
  return (
    <div>
      <Icon size={24} />
      <p>{name}</p>
    </div>
  );
};





// @ts-ignore
const Iteminfo:React.FC<info> = ({title,item, user,guest,image ,room,bathrooms,category,description,locations,price,id,reviews}) => {
 
  const icons = Object.entries(item).find(([key, value]) => value === true)?.[0];
  console.log(icons)
  console.log(item)
  const{toast}=useToast();
  const router=useRouter();
   const Map = dynamic(() => import('./Map'), { ssr: false });
  
  const [imgview, setimgview] = useState(false)
  const [rating, setRating] = useState(0)
  const [rdescription, setrdescription] = useState('')
  
  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }
  
  const handleReset = () => {
    // Set the initial value
    setRating(0)
  }
  console.log("is");
  console.log(id);
   const [disableddates, setdisableddates] = useState([])
   const [reservation, setreservation] = useState([])
  
  
  const param=useParams();
  
  const{listingId}=param
   
  let ranges:Date[]=[]
  
  
  
  
  
  useEffect(() => {
    axios.post('/api/getreservation',{listingId}).then((res)=>{ setreservation(res.data);
  res.data.map((res:any)=>{
  
    
    const range=eachDayOfInterval({
      start:new Date(res.startdate),
      end:new Date(res.enddate)
    });
    ranges=[...range,...ranges]
  

  
   
    
  })





  
  
  
  
  let rangestring= ranges.map((date)=>date.toString())
  
  setdisableddates(rangestring);
  
  
  }).catch(e=>console.log(e)).finally(()=>{ });
  }, [])


  
  const [editreview, seteditreview] = useState(false)
  
  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
  useEffect(() => {
   
if(userInfo){

  
  axios.put('/api/reviews',{email:userInfo?.email,listingid:listingId}).then((res)=>{
    
    seteditreview(res.data);
    console.log(editreview,'hello bahi')
    
    
  }
)
}



  }, [userInfo])
  
  const [review, setreview] = useState(reviews)
  
  
  
  
  

  
  console.log([parseFloat(locations?.split('?')[1]),parseFloat(locations?.split('?')[2])])
  
  
  // const disabled=reservation.forEach((reservation:any)=>{
  //   console.log(reservation.startdate)
  //   const range=eachDayOfInterval({
  //     start:new Date(reservation.startdate),
  //     end:new Date(reservation.enddate)
  //   });
  //   dates=[...dates,...range];
  //    return dates
  // });
  // console.log('helolo dates');
  // console.log(disabled)
  const [geo, setgeo] = useState<number[]|null>(null)
  
  
  useEffect(() => {
    if(locations){
  
    
      setgeo([parseFloat(locations?.split('?')[1]),parseFloat(locations?.split('?')[2])]);
     
      
    }
  
  
  
   
  }, [locations])
  


  const ref= React.useRef();

  const ceta=categories.find( (c)=>(c.name)===category);
  const [totalprice, settotalprice] = useState(1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [distance, setdistance] = useState(null);
  let dayCount=1;
  useEffect(()=>{
  
  console.log(state)
  
    if(state[0].startDate&&state[0].endDate){
      dayCount=Math.abs(differenceInCalendarDays(state[0].startDate,state[0].endDate))
      settotalprice(dayCount*price);
        
    }
  },[state])
  
  const [polyline, setpolyline] = useState(null);
  
  useEffect(() => {
  if(locations){
  
  
    axios.get(`https://us1.locationiq.com/v1/directions/driving/${locations?.split('?')[2]},${locations?.split('?')[1]};${localStorage.getItem("longitude")},${localStorage.getItem("latitude")}?key=pk.deb87b54fd43801d7fd7b12571d34439&overview=full`).then(res=>{setdistance(res.data.routes[0].legs[0].distance); setpolyline(res.data.routes[0].geometry); }).catch((E)=>{console.log(E);})
  
  }
  }, [locations])
  
  
  
  const handleReservation= function (){
  
    console.log(param);
    setloading(true);
  axios.post('/api/reservation',{state,totalprice,listingId:param.listingId,user:userInfo}).then((res)=>{;
    
    console.log(res.data);
    
    router.push(res.data.url)
  console.log(res.data.url)
    
    // const range=eachDayOfInterval({
    // start:new Date(res.data.startdate),
    // end:new Date(res.data.enddate)
    //      });
         
    //      ranges=[...range,...ranges]
  
    //      let rangestring= ranges.map((date)=>date.toString())
  
    //      setdisableddates([...disableddates,rangestring])
    //      console.log(disableddates);
  
    toast({title:'Succes',description:'sucessfully reserved'})}).catch(e=>console.log(e));
         
        }
        
        const [loading, setloading] = useState(false);
  
  function getShortForm(fullName) {
    const nameParts = fullName.split(' ');  // Split the full name by spaces
    const firstInitial = nameParts[0].charAt(0).toUpperCase();  // Get the first letter of the first name
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();  // Get the first letter of the last name
    
    return `${firstInitial}.${lastInitial}`;  // Return the initials separated by a dot
  }
  
   
    return (
     <>




  {imgview&&<div className=' w-screen h-[5000px] bg-black  absolute z-50 md:p-10  lg:p-40'><div className='text-white text-4xl ' onClick={(e)=>{  e.preventDefault();setimgview(false)}}><RxCross2></RxCross2></div> {image?.split("=").map(item=><div className="gallery-item relative"> <img src={item} className=" rounded-lg m-3"></img> </div>)}</div>}
  <div className="w-screen flex flex-col md:flex-row justify-center px-4 md:px-0">
  <div className="md:p-10 md:pt-24 pl-3 w-full md:w-auto pt-24">
    {title && <div className="text-2xl font-medium">{title}</div>}
    <div className="md:text-xl text-base text-gray-500 pt-3 flex items-center gap-3">
      <FaLocationDot />
      {locations?.split('?')[0]}
    </div>
    {distance && (
      <div className="md:text-2xl text-lg pt-3 flex items-center gap-3">
        <FaCar />
        {`${parseInt((distance / 1000).toString())} Km`}
      </div>
    )}

    <div className="flex flex-col md:flex-row md:gap-28 w-full md:w-[1600px]">
      {image && (
        <div
          className="grid grid-cols-2 grid-rows-2 gap-2 mt-5 md:w-4/5 w-full pr-5 h-[80vh] rounded-[30px] relative"
          onClick={() => setimgview(true)}
        >
          <div className="relative col-span-2 row-span-1 overflow-hidden rounded-lg">
            <img
              className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
              src={image.split('=')[0]}
              alt="Image 1"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
              src={image.split('=')[1]}
              alt="Image 2"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
              src={image.split('=')[2]}
              alt="Image 3"
            />
          </div>
        </div>
      )}

      {/* Info Section */}
      {/* <div className="hidden md:block">
        <Question />
      </div> */}
    </div>

    <div className="flex flex-col lg:flex-row gap-10 md:gap-24">
      <div className="flex flex-col">
        <div className="mt-6 text-base font-medium flex items-center gap-3">
          Hosted by {user?.username}
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex text-xs gap-2 mt-2 text-gray-500 pb-6 border-b w-full md:w-[700px]">
          <div className="text-base">{guest} guests</div>
          <div className="text-base">{room} rooms</div>
          <div className="text-base">{bathrooms} bathrooms</div>
        </div>

        <div className="mt-5 flex items-center gap-1 pb-5 border-b w-full md:w-[700px]">
          <TbMountain size={35} />
          <div>
            <div className="text-[22px] font-medium">{ceta?.name}</div>
            <div className="text-sm text-gray-500">{ceta?.description}</div>
          </div>
        </div>

        <div className="text-base text mt-5 pb-5 border-b w-full md:w-[700px]">
          <div className="text-lg font-semibold">My description</div>
          <div className="text-md text-neutral-800 mt-2">{description}</div>
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" className="-ml-2">
                Show more
              </Button>
            </DialogTrigger>
            <ScrollArea className="max-h-5/6">
              <DialogContent>
                <DialogTitle>Extra info</DialogTitle>
                <DialogDescription className="text-lg">
                  {item.extrainfo
                    .split('\n')
                    .map((line) => `• ${line.trim()}`)
                    .map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                </DialogDescription>
              </DialogContent>
            </ScrollArea>
          </Dialog>
        </div>

        {geo && polyline && (
          <Map
            encodedPolyline={polyline}
            geo={[
              parseFloat(locations?.split('?')[1]),
              parseFloat(locations?.split('?')[2]),
            ]}
          />
        )}
      </div>

      {/* Reservation Section */}
      <div className="md:w-[500px] w-full md:m-6 scale-90 md:scale-100 -mx-4 md:mx-0 md:mt-12 md:p-6 p-3 border rounded-3xl shadow-xl md:h-[850px]">
        <div className="text-2xl font-medium flex items-baseline mb-2 border-b">
          ${price} <div className="text-base text-gray-500 mb-2 ml-2">night</div>
        </div>
        <div className="md:w-full w-full scale-90 md:scale-100 flex justify-center border-b border-black">
          <DateRange
            onChange={(item) => {
              setState([item.selection]);
              console.log(item);
            }}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            disabledDates={disableddates}
            ranges={state}
            direction="horizontal"
          />
        </div>

        {!userInfo && (
          <button
            onClick={() => router.push('/auth/sign-up')}
            className="bg-gradient-to-r from-pink-500 w-full p-2 rounded-lg mt-2 mb-2 to-red-500 text-white"
          >
            Login first
          </button>
        )}
        {userInfo && (
          <button
            disabled={!userInfo}
            onClick={handleReservation}
            className="bg-gradient-to-r from-pink-500 w-full p-2 rounded-lg mt-2 mb-2 to-red-500 text-white"
          >
            {loading ? 'Reserving...' : 'Reserve'}
          </button>
        )}
        <div className="flex w-full items-center justify-between p-1 text-gray-500">
          Total<div className="text-black text-2xl">${totalprice}</div>
        </div>
      </div>
    </div>

    <Dialog>
      <DialogTrigger ref={ref}>
        <Button className="mt-3">Add Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What was your experience?</DialogTitle>
          <DialogDescription>Your review will help others; rate wisely</DialogDescription>
        </DialogHeader>
        {editreview ? (
          <div className="flex flex-col">
            <ReactStars count={5} onChange={(newRating) => setRating(newRating)} size={40} activeColor="#ffd700" />
            <div className="text-2xl mt-2">Review</div>
            <textarea
              onChange={(e) => setrdescription(e.target.value)}
              className="border-2 p-4 rounded-lg w-full"
              placeholder="Write your review here..."
            />
            <Button
              disabled={rdescription.length < 3 || loading}
              variant="destructive"
              onClick={() => {
                setloading(true);
                axios
                  .post('/api/reviews', {
                    rdescription,
                    rating,
                    listingId: id,
                    email: userInfo?.email,
                  })
                  .then((res) => {
                    console.log(res.data);
                    setreview([...res.data]);
                    setloading(false);
                    ref.current?.click();
                  })
                  .catch(() => setloading(false));
              }}
            >
              {loading ? 'Uploading...' : 'Add Review'}
            </Button>
          </div>
        ) : (
          <div>Sorry, you don't have a reservation at this place, so you can't add a review.</div>
        )}
      </DialogContent>
    </Dialog>

    {/* Review and Questions Section */}
    <div className="flex flex-col md:flex-row gap-10 mb-40">
      <ReviewSection reviews={review} />
      <Question />
    </div>
  </div>
</div>;

     </>
    )
  }
  
  export default Iteminfo
  