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