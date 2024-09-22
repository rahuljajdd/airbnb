import { Card,CardContent,CardDescription } from '@/app/ui/card';
import React, { useContext } from 'react'
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { PiStudent, PiStudentLight } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { Stepcontext } from '@/context/AuthContextprovider';
import { Button } from '@/app/ui/button';
import { Progress } from '@/components/ui/progress';
import router, { useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs';
type Props = {
    register:UseFormRegister<FieldValues>
    usertype:'owner'|'student'|'client'
    setusertype:React.Dispatch<React.SetStateAction <'owner'|'student'|'client'>>
}

const TypeSelectionForm = ({usertype,setusertype,register}:Props) => {
    const{watch,setValue }=useFormContext();
   const{getValues} =useFormContext();
const router= useRouter();
    const {step,setstep}=useContext<any>(Stepcontext)
  return (<>

    <div className='text-2xl font-semibold '>
<h1> Create an account</h1>
 </div>
<p className='text-gray-600'>Tell us about your self from more tailored expirince</p>
<Card onClick={()=>{setusertype("owner")}} className={`p-2 mt-5 border-[3px] ${usertype==='owner'&&'border-[3px] border-red-500 transition-all'}  cursor-pointer flex items-center`}>
<CiShop size={50} />

<CardContent>
    <div>I am a buissness owner</div>
<CardDescription>want to  list my property </CardDescription>

</CardContent>
</Card>





<Card  onClick={()=>{setusertype("student")}} className={`p-2 mt-5 border-[3px] ${usertype==='student'&&'border-[3px] border-red-500 transition-all '}  cursor-pointer flex items-center`}>
<PiStudentLight size={50} />
<CardContent>

<div>
               
    <div>I am a Devloper or student</div>
<CardDescription>want to checkout this full stack project</CardDescription>
</div>
</CardContent>
</Card>
<Button onClick={()=>{  setValue('type',usertype, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    }); console.log(getValues()); setstep(1)}} className='w-full mt-5'>Continue</Button>
  <Progress className='mt-10' value={33*(step+1)}></Progress>
  <div onClick={()=>{router.push('/auth/sign-in')}} className='font-semibold mt-5 w-full justify-center flex hover:underline cursor-pointer'>Already have an account?</div>
  </>
  )
}

export default TypeSelectionForm