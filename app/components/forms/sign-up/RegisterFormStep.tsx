
//@ts-nocheck
"use client"
import { Stepcontext } from '@/context/AuthContextprovider'
import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import TypeSelectionForm from './TypeSelectionForm'
import SignupForm from './SignupForm'
import Otpform from './Otpform'

  const RegisterFormStep = () => {
const{step}=useContext<any>(Stepcontext);
    const{ register,formState:{errors} ,setValue}=useFormContext()
   
   const [usertype, setusertype] = useState<'owner'|'student'>('owner')



switch(step){

case 1:
return(
<div><SignupForm></SignupForm></div>
);
case 2:
    return(
        <div><Otpform></Otpform></div>
        );
}




  return (
    <div><TypeSelectionForm register={register} usertype={usertype} setusertype={setusertype} ></TypeSelectionForm></div>
  )
}


export default RegisterFormStep