import React, { useEffect, useState } from 'react'
import { Badge } from "@/app/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area'
  import {format} from 'date-fns'
  import { Avatar, AvatarImage } from '../ui/avatar'
  import { AvatarFallback } from '@radix-ui/react-avatar'
  import { IoPersonSharp } from 'react-icons/io5'
import { useContext } from 'react'
import { Context } from './UserProvider'
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
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription, AlertTitle } from '@/app/ui/alert'
import { Item } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '../ui/skeleton'
const Answer = () => {

  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;

    const [questions, setquestions] = useState('')
    const [questionset, setquestionset] = useState([1])
    const [loader, setloader] = useState(false)




    useEffect(() => {
if(!loader){


  
          axios.post('/api/answers',{email:userInfo?.email}).then((res)=>{setquestionset(res.data)}).catch(e=>console.log(e));

}
    
    }, [loader,userInfo])
    
  return (
    <div>

<Card className='md:w-[650px]  w-[620px] h-[800px] md:m-5  mx-4 mt-4 relative'>
  <CardHeader>
    <CardTitle className='text-2xl'> Questions from users</CardTitle>

  </CardHeader>
  <CardContent className=''>

  <ScrollArea  className="h-[700px] w-full -m-2  pl-0">



{(questionset[0]===1)&&<div>
  
{[1,1,1,1,1,1,1].map((item)=>{return( <div> <Skeleton className='w-[550px] mt-4 h-32'></Skeleton> </div>)})}
  
  
  </div>}

{(questionset.length===0)&&<div className='  h-full   items-center flex justify-center'>
  
no qouestion ywt on your listings
  
  
  </div>}

{(questionset[0]!==1)&&questionset.map((item:any)=>{

  
  return(
    
    
    <>
    
    
<Dialog  >
  <DialogTrigger>



  <Card className='w-[550px] mt-4'>

<CardContent className='flex justify-between'>


<div className='flex items-center '>

<Avatar>
  <AvatarImage src={item.user?.image}></AvatarImage>
  <AvatarFallback className='p-3 bg-slate-200 text-slate-500'><IoPersonSharp></IoPersonSharp></AvatarFallback>
</Avatar>
<div className='pl-2'>



  <div className='pt-4 font-semibold float-left '> {item?.question}</div>
  <div  className='pt-3 text-gray-500 '> {item?.user?.email}</div>
</div>

</div>
<div className='flex-col ' >



{item?.answered?<Badge variant="destructive" className='h-min w-min mt-2'>answered</Badge>:<Badge variant="default" className='h-min w-min mt-2'>unanswered</Badge>}

<div className='mt-7'>{ format(new Date(item.createdat), 'yyyy-MM-dd')}</div>
</div>







</CardContent>

</Card>
    
  </DialogTrigger>
  <DialogContent className='min-h-64'>
    <DialogHeader>
      <DialogTitle className='text-3xl'>{item.question}?</DialogTitle>
      <DialogDescription className='text-xl'>
        {(item?.answer)?<div>{item.answer}</div>:<textarea onChange={(e)=>{setquestions(e.target.value)}} placeholder='answer here' className='p-2 min-h-36 border w-full rounded-lg mt-5 '></textarea>}
   
      </DialogDescription>
    </DialogHeader>
  <DialogFooter>{!(item.answer)&&<Button disabled={loader} onClick={()=>{ setloader(true); axios.put('/api/answers',{questions,id:item.id,email:userInfo?.email}).then((res)=>{setquestionset(res.data);setloader(false)})}} className='p-5'>{loader?"Posting..":"Answer"}</Button>}</DialogFooter>
  </DialogContent>
</Dialog>



    
    
    </>
)
})}


</ScrollArea>






















  </CardContent>
  <CardFooter className='absolute bottom-0  '>
    
    

    

    
    
    
    
    
    
    
    
    
    
    </CardFooter>
 
</Card>










    </div>
  )
}

export default Answer