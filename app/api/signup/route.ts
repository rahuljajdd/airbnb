
import { NextRequest } from "next/server";

import bcrypt from 'bcrypt';


import { sendemail } from "@/app/helpers/mailer";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
const saltRounds = 10; // Number of salt rounds
async function hashPassword(password:any) {
    
  try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }

    
  }

export async function POST(request:NextRequest){




  
    const {email,username,password,clerkId}=await request.json()
  console.log(email,username,password,clerkId)

const hashedPassword= await hashPassword(password)
const user= await prisma.users.findFirst({where:{email,username}})

console.log(user,'user')
if(user){

    return Response.json({err:'user already exist'});
}
let newuser
try{
     newuser= await prisma.users.create({data:{email,username,hashedpassword:hashedPassword,clerkId}});

}catch(e){
console.log(e);
    return Response.json({err:'something went wrong'});
}



//send verification email

   const help= await sendemail({email,emailtype:'VERIFY',userid:newuser.id})
   console.log(help);

   console.log(newuser,'newuser')
    return Response.json({message:newuser});
    }
