//@ts-nocheck
'use client'

import React from 'react'
import { usesignin } from '@/hooks/use-signin'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/app/ui/button'
import { useRouter } from 'next/navigation'
const SiginForm = () => {
const{register,formState:{errors},getValues}=useFormContext()
const{handelsignin,loading}=usesignin();
const router=useRouter();
  return (
      <>
    <div className='flex-col w-80'>

    <div className='text-3xl font-semibold'>Login</div>
    <div className='text-gray-500'>welcome Back</div>

    <div className='flex-col flex'>

    <input  placeholder={'Email'}  className='border p-2 rounded-lg mt-4' {...register('email')}></input>
    {errors.email && <p  className='text-red-500 text-xs'>{errors?.email?.message}</p>}
    <input  placeholder={'Password'}  className='border p-2 rounded-lg mt-4' {...register('password')}></input>
    {errors.email && <p  className='text-red-500 text-xs'>{errors?.password?.message}</p>}
    </div>
    <Button className='w-full mt-5' onClick={async(e)=>{ e.preventDefault(); await handelsignin(getValues()) }}>{loading?'loading...':'Continue'}</Button>
    <div  onClick={()=>{router.push('/auth/sign-up')}} className=' flex justify-center font-normal mt-4 cursor-pointer hover:underline'>Dont have an account? Signup</div>
    </div>
      </>
  )
}

export default SiginForm