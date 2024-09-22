
"use client"
// import SiginForm from '@/components/forms/SiginForm'
// import { useSignupform } from '@/hooks/use-signup'
// import React from 'react'
import { FormProvider } from 'react-hook-form'
import SiginForm from '@/app/components/forms/SiginForm'
import { usesignin } from '@/hooks/use-signin'


const page = () => {
    const{form}=usesignin()
  return (

<>



    <FormProvider {...form}>


<SiginForm></SiginForm>


    </FormProvider>




</>
  )
}

export default page