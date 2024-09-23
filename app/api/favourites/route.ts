

import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";


const prisma=new PrismaClient();

export  async function POST(request:NextRequest) {
    
console.log('ddsfadfsdfacf');

try{

    const{user}=await request.json();
    
    console.log(user);
    if(user){

const listing=await  prisma.users.findFirst({

    where:{
        email:user.email,
        clerkId:user.clerkId,
    },
    
    select:{
        favourites:{select:{listingId:true}}
    }
})
console.log(listing);




const favour=await prisma.listing.findMany({
    
    where:{
        id:{
            in:listing?.favourites.map(item=>item.listingId)
        }
        
    }
})

return NextResponse.json(favour)
}



    }catch(e){console.log(e)}

    return NextResponse.json([1]);

}