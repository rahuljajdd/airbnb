//@ts-nocheck
"useclient"
import React, { useState } from 'react'
import { IoHeart } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import countries from 'world-countries';
import { number, string } from 'zod';
import { handleClientScriptLoad } from 'next/script';
import toast from 'react-hot-toast'
import axios from 'axios';
import { Button } from '@/app/ui/button';
interface props {
  items:any
  location: string
  price :number;
  category :string;
  imagesrc:string;
  id:string
  night:boolean
  cancelreservation:boolean
  onclick:(value:any)=>void
  delisting:boolean
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"
import Rent from './Rentmodal';
import EditModal from './EditModal';

import { json } from 'stream/consumers';
import { addtofavourites } from '@/actions';
import { useContext } from 'react';
import { Context } from './UserProvider';

// @ts-ignore
const Card:React.FC<props> = ({ distance,setreservation,setproperties,items,location, price,category,imagesrc,id,night,title,description,cancelreservation,delisting ,roomcount,guestcount,bathroomcount,onclick}) => {
  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
  const [loader, setloader] = useState(false);
  const [pop, setpop] = useState()
  const [like, setlike] = useState(false)  
  console.log(price);
  // @ts-ignore
  const deletreservation=  function (){ axios.post('/api/delreservation',{id}).then((res)=>{const{error} =res.data; setloader(false); if(error){toast.error(error);}else{toast.success('Reservation sucessfull deleted');   axios.post('api/ownerreservations' ,{userid:userInfo?.email}).then((res)=>{setreservation(res.data)})   } }).catch((e)=>{console.log(e); setloader(false)}) }     
// @ts-ignore
  const deleltelisting= function (){   console.log(id); axios.post('/api/dellisting',{id}).then((res)=>{     const{error} =res.data; if(error){toast.error(error);}else{toast.success('Listing sucessfull deleted');}    axios.post('/api/getlistings',{email:userInfo?.email,name:userInfo?.username}).then((res)=>{setproperties(res.data)}).catch((e)=>{console.log(e);}) ;   console.log(res);  setpop(false); setloader(false);}).catch((e)=>{console.log(e);}) }     

const router=useRouter();
  return (
    <div className='p-5  mx-auto md:mx-0 cursor-pointer group'  >
    
    <div className='md:w-60 w-60 h-60 relative overflow-hidden rounded-lg  ' onClick={()=>{ 


      // @ts-ignore
      console.log(items._id);router.push(`/listings/${items.id}`)}}>
        <div className=' z-50'  onClick={async(e)=>{e.stopPropagation();

setlike(true)

const result= await addtofavourites(userInfo?.email,id)
if(result?.status===400){
  toast.error(result?.message)
}
else{
  toast.success(result?.message)
}

        }}>

        <IoHeart size={30}    className= { `   absolute top-3  right-3 z-10  transition-all hover:scale-110 ${like?"text-red-700":'text-gray-600 opacity-50'} shadow-2xl `}></IoHeart>
        </div>
        <img  className ='w-full h-full rounded-lg transition-all  cursor-pointer object-cover  group-hover:scale-105'src={imagesrc}></img></div>
    <div className='mt-1 w-60 '>{location?.split(',')[0]+","+location?.split(',')[1] }</div>
   
   <div className='flex justify-between items-center'>
    <div className='mt-1 text-xs text-gray-500'>{category}</div>
    {distance&&<div className='p-1 font-medium '>{Math.round(distance/1000)} km away</div>}
    
    </div> 
    
    <div className='text-base font-medium flex items-center gap-2  mt-1'>$ {price} night <div className='text-[14px] text-gray-600'>{night&&'night'}</div></div>
  <div className='flex '>

    
{delisting&&<div className='w-full    '>
<Dialog >
  <DialogTrigger><Button className='w-60 mt-2 '  >Edit</Button></DialogTrigger>
  <DialogContent className="h-screen justify-start max-h-[93vh] overflow-y-auto pt-0 ">
    <DialogHeader>
     

    </DialogHeader>

<EditModal setproperties={setproperties} items={items}></EditModal>
{/* <Rent Locatio={location} Titl={title} Categor={category}  ImageSr={imagesrc} Pric={price} Descriptio={description} GuestCoun={guestcount} RoomCoun={roomcount} BathroomCoun={bathroomcount}  ></Rent> */}
  </DialogContent>
</Dialog>
  </div>
}



{cancelreservation&&<div className='w-full  '>
<Dialog >
  <DialogTrigger ><Button className='w-60 mt-2'  variant={"destructive"}>{loader?"Deleting...":"Cancle Reservation"}</Button></DialogTrigger>
  <DialogContent >
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete this Reservation
        with all your data
        <div className='flex justify-between pt-9'>
          <div></div>

          <Button disabled={loader}  onClick={ (e)=>{ e.stopPropagation(); deletreservation();setloader(true) ; 
            // @ts-ignore
          } }variant={"destructive"}>{loader?"Deleting":"Delete"}</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  </div>
}
    
          </div>




    
{delisting&&<div className='w-full  '>
<Dialog >
  <DialogTrigger ><Button className='w-60 mt-2'  variant={"destructive"}>{loader?"Deleting...":"Delete"}</Button></DialogTrigger>
  <DialogContent >
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete this Listing
        with all your data
        <div className='flex justify-between pt-9'>
          <div></div>

          <Button disabled={loader}  onClick={ (e)=>{ e.stopPropagation(); deleltelisting();setloader(true) ; 
            // @ts-ignore
           } }variant={"destructive"}>{loader?"Deleting":"Delete"}</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  </div>
}
    {/* {delisting&&<div className='w-full flex justify-center'><button className={`flex justify-center w-full mt-1 rounded-lg text gra  transition-all p-1 text-sm ${loader?'bg-red-500': 'bg-red-600'}`} onClick={ (e)=>{ e.stopPropagation(); listing(); setloader(true)}}>{loader?'Deleting...':'Delete Listing'}</button></div>} */}
  
    
  </div>
  )
}

export default Card
