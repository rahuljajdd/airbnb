
//@ts-nocheck
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {

    value: number;
    setValue: (value: number) => void;
  }
  
  
  export   const Stepcontext= createContext<number|undefined>(undefined);
  const {Provider}=Stepcontext

  
  export const AuthContextProvider:React.FC<{children:React.ReactNode}>=  ({children}:{children:React.ReactNode})=>{
const [step, setstep] = useState(0)

return(


  <>
  <Provider value={{step,setstep}} >{children} </Provider>
  </>
)


   }


//    export const useAuthContextHook=()=>{


// const currentstep=useContext(Stepcontext)

//     return  currentstep;
//    }