

"use client"
import { useToast } from "./use-toast";
import { SignUp, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from 'zod';
import { onCompleteUserRegistration } from "@/actions";
import axios from "axios";

export interface registerProps{

    type:string,
    fullname:string,
    email:string,
    
    password:string,
    confirmpassword:string,
    otp:string
    
    
     }
    


const registerSchema = z.object({
    type: z.string().nonempty("Type is required"),
    fullname: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmpassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
    otp: z.string().nonempty("OTP is required"),
  })
  .refine(data => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });


export const useSignupform=()=>{

    const { toast } = useToast();

const [loading, setloading] = useState<boolean>(false)
const{signUp,isLoaded,setActive}=useSignUp();
const router=useRouter();

const form = useForm<registerProps>({
    resolver: zodResolver(registerSchema),
defaultValues:{type:'owner'},
mode:"onChange"
  });

  const onGenerateotp=async(
    email:string,password:string,name:string,onNext:React.Dispatch<React.SetStateAction<number>>
  )=>
  {


    if(!isLoaded){

        return
    }

    try{

        await signUp.create({emailAddress:email,password:password});

        await signUp.prepareEmailAddressVerification({strategy:'email_code'});
        onNext(2);
        toast({
            title:"Success",
            description:'email send on your email',
        })


// Step 2: Update the user profile with the first name




    }catch(e:any)
    {

        toast({
            title:"Error",
            description:e.errors[0].longMessage,
        })

    }
  }



  const onHandleSubmit= async(value:any)=>{


    if(!isLoaded){
        return
    }
try{
    setloading(true);
    const completesignUp= await signUp.attemptEmailAddressVerification({code:value.otp})
console.log(completesignUp);
if(completesignUp.status!=="complete"){

    return{message:'something went wrong'}
}
if(!completesignUp.createdUserId){
    return
}

    // const registered= await onCompleteUserRegistration(
    //     value.fullname,
    //     value.type,
    //     completesignUp.createdUserId,
    //     value.email
    // );



   const regiseter= await axios.post('/api/signup',{email:value.email,username:value.fullname,password:value.password,clerkId: completesignUp.createdUserId}).then(async(res)=>{


console.log(res.data)

if(res.data.message){


    await setActive({
        session:completesignUp.createdSessionId
    })
    setloading(false)
    console.log('goind to register')
    router.push('/')








}else{
    toast({title:'Error',
        description:'Something went wrong'
    })
 

}









   })







// if(registered?.status===200){
// await setActive({
//     session:completesignUp.createdSessionId
// })
// setloading(false)
// console.log('goind to register')
// router.push('/')


// }
// if(registered?.status===400){
//     toast({title:'Error',
//         description:'Something went wrong'
//     })
// }

}catch(e:any){

    console.log(e)
    toast({title:'Error',
        description:'something went wrong'
    })
    

}

  }


  return{
    form,onGenerateotp,onHandleSubmit,loading
  }
  
 
}