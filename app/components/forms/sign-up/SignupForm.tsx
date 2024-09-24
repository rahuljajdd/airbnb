
//@ts-nocheck
"use client"

import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/app/ui/button'
import { Progress } from '@/components/ui/progress'
import { Stepcontext } from '@/context/AuthContextprovider'
import { useRouter } from 'next/navigation'
import { useSignupform } from '@/hooks/useSignup'

type Props = {}

const SignupForm = (props: Props) => {
const router= useRouter()
const{onGenerateotp,loading}=useSignupform();
    const{ watch,register,trigger,formState:{errors} ,setValue,getValues}=useFormContext()
const{step,setstep}=useContext<any>(Stepcontext);
  return (
    <div >
          <div className='text-2xl font-semibold '>
<h1> Account Details</h1>
 </div>
<p className='text-gray-600'>Tell us about your self from more tailored expirince</p>

<div className='flex flex-col'>

<input  placeholder={'Fullname'}className='border p-2 rounded-lg mt-4' {...register('fullname')}></input>
{errors.fullname&& <p className='text-red-500 text-xs'>{errors?.fullname?.message}</p>}
<input  placeholder={'Email'}  className='border p-2 rounded-lg mt-4' {...register('email')}></input>
{errors.email && <p  className='text-red-500 text-xs'>{errors?.email?.message}</p>}
<input  placeholder={'Passwoard'} className='border p-2 rounded-lg mt-4' {...register('password')}></input>
{errors.password && <p className='text-red-500 text-xs'>{errors?.password?.message}</p>}
<input placeholder={'Confirm Password'}  className='border p-2 rounded-lg mt-4' {...register('confirmpassword')}></input>
{errors.confirmpassword && <p className='text-red-500 text-xs'>{errors?.confirmpassword?.message}</p>}
<Button onClick={async(e)=>{ e.preventDefault(); console.log(getValues());  if(! await trigger(['email','fullname','confirmpassword','password'])){  console.log(errors);return} await onGenerateotp(getValues('email'),getValues('password'),getValues('fullname'),setstep)}} className='w-full mt-5'>{ !loading?'Continue':'loading ..'}</Button>
  <Progress className='mt-10'  value={33*(step+1)}></Progress>
  <div onClick={()=>{router.push('/auth/sign-in')}} className='font-semibold mt-5 w-full justify-center flex hover:underline cursor-pointer'>Already have an account?</div>


</div>

</div>
  )
}

export default SignupForm