//@ts-nocheck

'use client'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/app/ui/badge"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/ui/dialog"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { format } from 'date-fns';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/ui/card"
  import { Button } from '@/app/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Context } from './UserProvider'
import { useContext } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/app/ui/alert'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { FaPerson } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import { Router } from 'next/router'
const Question = () => {

  const [loader, setloader] = useState(false)
  const context = useContext(Context);
  const ref = React.useRef();
  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;

    const [questions, setquestions] = useState('')
    const [questionset, setquestionset] = useState([])


const router=useRouter();

    useEffect(() => {


        axios.get('/api/questions').then((res)=>{setquestionset(res.data)}).catch(e=>console.log(e));
    
    }, [])
    
  return (
    <div className='w-full md:block flex justify-center mt-0 md:mt-3'>

<Card className='    w-screen  md:w-[600px] min-h-42 max-h-[800px] m-0 md:mt-0 mt-6 md:m-5 mr-10 relative'>
  <CardHeader>
    <CardTitle className='text-2xl'> Questions from users</CardTitle>

  </CardHeader>
  <CardContent className=''>

<ScrollArea  className="h-[600px] w-full -m-2  md:p-4 p-0">




{(questionset.length!==0)&&questionset?.map((item:any)=>{
  
  
  return(
    
    
    <>
    
    
<Dialog >
  <DialogTrigger>



  <Card className='md:w-[510px] w-[90vw] mt-3   md:mt-4 '>

<CardContent className='flex justify-between'>



<div className='flex items-center '>

<Avatar>
  <AvatarImage src={item.user?.image}></AvatarImage>
  <AvatarFallback className='md:p-3  bg-slate-200 text-slate-500'><IoPersonSharp></IoPersonSharp></AvatarFallback>
</Avatar>
<div className='pl-2'>



  <div className='pt-4 font-semibold float-left  text-sm'> {item?.question}</div>
  <div  className='pt-3 text-gray-500 text-xs  '> {item?.user?.email}</div>
</div>

</div>
<div className='flex-col ' >



{item?.answered?<Badge variant="destructive" className='h-min md:text-xs text-[7px] w-min mt-2'>answered</Badge>:<Badge variant="default" className='h-min w-min mt-2 md:text-xs text-[7px]'>unanswered</Badge>}

<div className='mt-7  md:text-xs text-[10px] ' >{ format(new Date(item.createdat), 'yyyy-MM-dd')}</div>
</div>


</CardContent>

</Card>
    
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-xl'>{item.question}?</DialogTitle>
      <DialogDescription className='text-base'>
      {item.answer?<>{item?.answer}</>:<div className='mt-5 text-2xl'><Alert><AlertTitle><div className='text-2xl font-semibold'>Sorry</div></AlertTitle><AlertDescription className='text-lg text-gray-600'>Sorry, this question is not yet answerd by the listing owner</AlertDescription></Alert></div>}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>



    
    
    </>
)
})}

</ScrollArea>















  </CardContent>
  <CardFooter className='absolute bottom-0  '>
    
    
  <Dialog>
  <DialogTrigger ref={ref}>    <Button className='p-6'>Post Question</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Post question?</DialogTitle>
      <DialogDescription>
      ask what you want to know about the property
       
      </DialogDescription>
    </DialogHeader>

<textarea onChange={(e)=>{setquestions(e.target.value)}} placeholder='ask question here' className='p-3 border rounded-lg min-h-28'></textarea>
<Button disabled={!(questions.length>1&&userInfo)} className='w-min px-4' onClick={()=>{ setloader(true);  axios.post('/api/questions',{questions,email:userInfo?.email}).then((res)=>{ setquestionset([...questionset,res.data]); ref?.current?.click()})  }}>{loader?'posting...':'Post'}</Button>



  </DialogContent>
</Dialog>
    

    
    







       
    
    </CardFooter>
 
</Card>













    </div>
  )
}

export default Question