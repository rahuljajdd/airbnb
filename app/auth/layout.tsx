import { Toaster } from '@/components/ui/toaster';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async({children}:{children:React.ReactNode}) => {

const user= currentUser();


if(!user){
 redirect('http://localhost:3000')
}
  return (

    <div className='w-screen flex justify-center items-center h-screen'>{children}</div>
  
  )
}

export default layout