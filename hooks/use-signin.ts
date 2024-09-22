
"use client"
import { SignIn } from "@clerk/nextjs"
import { useState } from "react"
import { useFormContext,useForm } from "react-hook-form"
import { useSignIn } from "@clerk/nextjs"
import { useToast } from "./use-toast"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'

const signInSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
  });
export  const usesignin=()=>{


const {toast}=useToast();
const router =useRouter();
const  [loading, setloading] = useState(false)
const{isLoaded,setActive,signIn}=useSignIn();
const form=useForm<{email:string,password:string}>({
    resolver: zodResolver(signInSchema),

mode:"onChange"
  });

const handelsignin =async(value:{email:string,password:string})=>{

console.log(value);

setloading(true);
    if(!isLoaded){
        return
    }

    try{

const isauthenticated=await signIn.create({password:value.password,identifier:value.email})
console.log(isauthenticated);
if(isauthenticated.status==="complete"){

    const active =await setActive({session:isauthenticated.createdSessionId})
    console.log(active);
    setloading(false);
toast({title:'Succes',description:'Welcome back'})
router.push('/');
    return 
}
    }catch(e){

        setloading(false);
        toast({title:'Error',description:"incorrect password or connection error"})

    }



}

setloading(false);

return {

        form,handelsignin
    }




}

