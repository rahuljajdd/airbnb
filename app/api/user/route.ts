import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
const prism=new PrismaClient()

export  async function POST(request:NextRequest){

const{email,clerkId}= await request.json();
const user=await prism.users.findFirst({where:{email,clerkId}}) 


return NextResponse.json(user)



    
} 