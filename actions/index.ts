import { PrismaClient } from "@prisma/client"


const prism = new PrismaClient();

export const addtofavourites= async({email,listingId}:{email:string,listingId:string})=>{

console.log(email)


    if(!email){

        return {status:400,message:'you are not logined'}
    }



    try{

        if(email&&listingId){
            
            
            const favourites= await prism.users.update({
                
                where:{
                email
            },
            data:{
                favourites:{
                    create:{
                        listingId,
                    }
                }
            },
            
            select:{
                favourites:{
                    where:{listingId}
                }
                
                
            }
        })
        
        
        if(favourites){
            
            console.log(favourites)
            return{status:400,message:'listings added to favourites'}
        }
        
        
        
    }
    
    
    
}catch(e){
    
    return{status:400,message:'listings added to favourites'}

}

}


export    async  function onCompleteUserRegistration(
    fullname:string,type:string,clerkid:string,email:string
){


console.log(    fullname,type,clerkid,email)
try{
    const registerd = await prism.users.create({

        data:{
            email:email,clerkId:clerkid,username:fullname
        },select:{
            username:true,id:true
        }
    })

    console.log(registerd);

   

    if (registerd){

        return {status:200,user:registerd}
    }

}catch(e){
    console.log(e)
    return {status:400}
}

}