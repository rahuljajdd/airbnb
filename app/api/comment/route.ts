import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { comment } from "postcss";
const prisma= new PrismaClient();




export async function PUT(request:NextRequest){

    const data= await request.json();

    try{
        const user= await prisma.users.findFirst({where:{email:data.email}})
        if(user){
            
            const coment= await prisma.reply.create({data:{commentId:data.commentId,reply:data.reply,userId:user.id},include:{user:true}}) 
            return NextResponse.json(coment)
        }
        return NextResponse.json({error:'user not fonund'})
        
    }catch(e){
        console.log(e);
        return NextResponse.json({error:'something went wrong'})
    }

}

export async function POST(request:NextRequest){

console.log('hehel');
    const data= await request.json();

    try{
        const user= await prisma.users.findFirst({where:{email:data.email}})
        if(user){
            
            const coment= await prisma.comments.create({data:{reviewId:data.reviewId,comment:data.comment,userId:user.id},include:{user:true,reply:true}}) 
            return NextResponse.json(coment)
        }
        return NextResponse.json({error:'user not fonund'})
        
    }catch(e){
        console.log(e);
        return NextResponse.json({error:'something went wrong'})
    }
    

}


export async function GET(request:NextRequest){

    const reviewId=request.nextUrl.searchParams.get('reviewId')

    
    try{
        if(reviewId){

            const coment= await prisma.comments.findMany({where:{reviewId:reviewId},include:{user:true,reply:{include:{comment:true,user:true}},}}) 
            
            return NextResponse.json(coment)
        }
        else{

            return NextResponse.json({error:'something went wrong'})
        }
        
    }catch(e){
        console.log(e);
        return NextResponse.json({error:'something went wrong'})
    }
    

}