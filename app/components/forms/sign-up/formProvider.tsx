
"use client"
import { AuthContextProvider } from '@/context/AuthContextprovider'
import { useSignupform } from '@/hooks/useSignup'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import RegisterFormStep from './RegisterFormStep'



export const SignformProvider = ({children}:{children:React.ReactNode}) => {
    const{form,loading,onGenerateotp ,onHandleSubmit}=useSignupform();
  return (
    <div>

        <AuthContextProvider>
<FormProvider {...form}>
<form onSubmit={onHandleSubmit}>
<RegisterFormStep></RegisterFormStep>
    
</form>

</FormProvider>
        </AuthContextProvider>
    </div>
  )
}