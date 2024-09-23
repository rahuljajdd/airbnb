import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
const prism=new PrismaClient()

export  async function POST(request:NextRequest){

const{email,clerkId}= await request.json();
const user=await prism.users.findFirst({where:{email,clerkId}}) 


return NextResponse.json(user)



    
} 
export  async function PUT(request:NextRequest){

const{user,id}= await request.json();


try{


    const userexist= await prism.users.findFirst({where:{email:user.email,clerkId:user.clerkId}})
    if(!userexist){
        return NextResponse.json({error:' Sign-up first'})
    }



const favourites=await prism.favourites.create({data:{

    userid:user.id,listingId:id
}})

    
if(favourites){

    return NextResponse.json({success:'added to favourites'})
}


}catch(e){

    return NextResponse.json({error:'something went wrong'})
}



    
} 



