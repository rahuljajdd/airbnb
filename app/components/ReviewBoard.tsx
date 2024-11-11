//@ts-nocheck
"use client"
import { Poppins } from 'next/font/google'
import { FaRegComment } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react';
import { IoHeartOutline } from 'react-icons/io5'
import Heart from 'react-animated-heart';
import { useContext } from 'react';
import axios from 'axios';
import {format} from 'date-fns'
import { useState } from 'react';
import { Context } from './UserProvider';
import { Button } from '../ui/button';
import { DialogContent,Dialog,DialogTrigger } from '../ui/dialog';
import { FaReply } from 'react-icons/fa6';
import { date } from 'zod';
import ClipLoader from 'react-spinners/ClipLoader';

const ReviewBoard = ({reviews}) => {
    const [like, setlike] = useState(false)
    const [comment, setcomment] = useState('')
    const [comments, setcomments] = useState([])
const [reply, setreply] = useState();
const param={reviewId:reviews.id}
 function getComments(){
  axios.get('/api/comment',{params:param}).then((res)=>{setcomments(res.data)})

 }
    useEffect(() => {
      
  getComments();
    }, [])
    const context = useContext(Context);
const [loader, setloader] = useState(false)
  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;
    
  return (
    <div className=''>

<Card className='h-auto w-[750px] mt-4 poppins relative '>

<div className='p-3 flex gap-2'><img className='size-14 rounded-full' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img>
<div className='poppins font-semibold'>{reviews.user.username}<div className='text-gray-500 font-medium text-sm'>{format(reviews.createdat, 'MMM do, yyyy')}</div></div>
</div>

<div className='ml-20 -mt-1'>

<div className='bg-neutral-200 shadow p-1  rounded-lg flex w-min   items-center '>
   
    {Array(reviews.rating).fill('').map((item)=> <StarFilledIcon></StarFilledIcon>)}
   <div className=' px-2 text-xs'>{reviews.rating}</div>


</div>

<div className=' pt-3  pr-4 text-xs poppins'>{reviews.description}</div>

<div className='border-b w-[500px] mt-3 '></div>
</div>
<div className='absolute top-0 right-0 -m-4'><Heart isClick={like} onClick={()=>{setlike(!like)}}></Heart></div>
<div className='ml-20'>



<Dialog>
  <DialogTrigger>
  <div  className='text-sm py-1 cursor-pointer  '>{`view more comments`}</div>
  </DialogTrigger>
  <DialogContent className='px-0 md:px-5'>
  <div className=' flex coment card gap-2 mt-1' >
    <div><img className='size-12 rounded-full'  src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img></div>

<div className='' >
<div className='p-3 flex gap-2'><img className='size-14 rounded-full' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img>
<div className='poppins font-semibold'>{reviews.user.username}<div className='text-gray-500 font-medium text-sm'>{format(reviews.createdat, 'MMM do, yyyy')}</div></div>
</div>

<div className='ml-20 -mt-1'>

<div className='bg-neutral-200 shadow p-1  rounded-lg flex w-min   items-center '>
   
    {Array(reviews.rating).fill('').map((item)=> <StarFilledIcon></StarFilledIcon>)}
   <div className=' px-2 text-xs'>{reviews.rating}</div>


</div>

<div className=' pt-3  pr-4 text-xs poppins'>{reviews.description}</div>

<div className='border-b w-[500px] mt-3 '></div>
</div>
<div className='absolute top-0 right-5 -m-4'><Heart isClick={like} onClick={()=>{setlike(!like)}}></Heart></div>
<div className='max-h-[500px] overflow-y-scroll'>

{comments?.map((item)=>{
  
  
  return(
    <div>

    <div className='p-3  md:w-full w-screen border-b  cursor-pointer mt-4 relative  '>
<div className=' absolute bottom-2 right-2 text-neutral-500   ' onClick={()=>{  if(reply){setreply(null);  ;return} setreply(item)}} > <div className='text-xs text-neutral-500'>{reply===item?'undo':'reply'}</div><FaReply></FaReply></div>
  
  <div className=' '>

    <div className='text-sm flex gap-2 items-start font-semibold'>  <div><img className='size-12 rounded-full'  src={item.user.image||'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'}></img></div><div>{item.user.username}<div className='text-xs text-neutral-500'>{item.comment}</div></div><div className='text-gray-400 text-xs font-medium'>{'Sep 25th, 2024'}</div> </div>

  </div>

</div>
<div  className='w-full flex justify-between'>

 { item.reply.length>0&&<div className=' mt-1 text-xs text-neutral-500'>replies</div>}
<div>
  
{item.reply?.map((item)=>{
  
  return(
    
    <div className='  p-2 relative md:w-96 bg-slate-50 rounded-lg mt-2  w-screen'>
<div className=' absolute bottom-2 right-2 text-neutral-500    ' > <div className='text-xs text-neutral-500'></div></div>
   
   
   <div>
    <div className='text-sm flex gap-2 items-center font-semibold'>  <div><img className='size-12 rounded-full'  src={item.user.image||'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'}></img></div>{item.user.username}<div className='text-gray-400 text-xs font-medium'>{'sd'}</div> </div>
    <div className='text-xs mt-1 ml-14'>{item?.reply}</div>
    </div>
  </div>

);
})}
</div>
</div>

</div>
);
})}
</div>

<div className='add comment w-screen md:w-full mt-4 mb-4  flex'>

<div className='flex-shrink-0'><img  className='size-12 rounded-full' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img></div>

<input  placeholder='Add a comment ' onChange={(e)=>{setcomment(e.target.value)}} className='w-full border px-2  mx-4 rounded-lg bg-neutral-100'></input>

{loader&&<div className=' border p-2 bg-blue-500 text-white rounded-md ml-3 flex justify-center items-center '><ClipLoader></ClipLoader></div>}
{!loader&&<div className='border p-2 bg-blue-500 text-white rounded-md ml-3 ' onClick={()=>{  setloader(true); console.log(reply,"hello"); if(reply){ console.log(reply); axios.put('http://localhost:3000/api/comment',{email:userInfo?.email,reply:reply.comment,commentId:reply.id}).then((res)=>{ getComments(); setloader(false); setreply(null) }).catch(e=>{console.log(e); setreply(null);setloader(false)});  return}  axios.post('http://localhost:3000/api/comment',{email:userInfo?.email,comment,reviewId:reviews.id}).then((res)=>{ const{error}=res.data; setloader(false); if(error){return} setcomments([...comments,res.data ])  }).catch(e=> setloader(false))}}> {reply?'Reply':'Comment'}</div>}
</div>
</div>
</div>
{reply&& `replying to ${reply.user.username} "${reply.comment}"`}


  </DialogContent></Dialog>
  </div>

{/* <div className='add comment ml-20 mt-4 mb-4  flex'>

<div className='flex-shrink-0'><img  className='size-12 rounded-full' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img></div>

<input  placeholder='Add a comment ' className='w-full border px-2  mx-4 rounded-lg bg-neutral-100'></input>
</div> */}
</Card>
{/* 
<div className='w-full flex justify-end mt-2 '><Button variant={'outline'}> <div className='text-blue-500'>All Reviews</div></Button> </div> */}

    </div>
  )
}

export default ReviewBoard 