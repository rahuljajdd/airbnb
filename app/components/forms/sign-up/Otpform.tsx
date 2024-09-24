import React, { useContext } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { Stepcontext } from '@/context/AuthContextprovider';
import { useForm, useFormContext } from 'react-hook-form';
import { useSignupform } from '@/hooks/useSignup';
const Otpform = () => {
const{handleSubmit,setValue,getValues}=useFormContext();
const{onHandleSubmit,loading}=useSignupform();
    const router=useRouter();
    const {step,setstep}=useContext<any>(Stepcontext);
    const [otp, setotp] = useState('');
  return (
      <>
          <div className='p-3'>
          <div className='text-2xl font-semibold '>
<h1> Enter OTP</h1>
 </div>
<p className='text-gray-600'>Enter the one time passwoard that is sent on your email</p>
    </div>
<div className='flex justify-center w-full p-7'>

    <InputOTP maxLength={6} onChange={(value)=>{setotp(value)}} className=' text-3xl'>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

</div>

<Button disabled={otp.length!==6} className='w-full mt-5' onClick={(e)=>{ e.preventDefault(); console.log(getValues());  setValue('otp',otp, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    }) ;   console.log(getValues()); onHandleSubmit(getValues()); }}>{loading?'loading...':'continue'}</Button>
  <Progress className='mt-10'  value={25*(step+1)}></Progress>
  <div onClick={()=>{ router.push('/auth/sign-in')}} className='font-semibold mt-5 w-full justify-center flex hover:underline cursor-pointer'>Already have an account?</div>

      </>
  )
}

export default Otpform