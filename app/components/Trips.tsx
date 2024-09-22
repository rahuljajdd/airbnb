
// @ts-nocheck

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from './UserProvider'
import { useEffect } from 'react'

import Card from './Card'
import { format } from 'date-fns'

const Trips = () => {
    const [trips, settrips] = useState([])
    const [reservation, setreservation] = useState([])
    const context = useContext(Context);

    // Check if the context is defined
    if (!context) {
      throw new Error('MyComponent must be used within a UserProviders');
    }
  
    const { userInfo } = context;

    useEffect(() => {
        
    axios.post('api/getreservation' ,{email:userInfo?.email}).then((res)=>{setreservation(res.data)})
      }, [userInfo])

     
      

  return (
    <>

    {(reservation.length===0)&&<>
    
    
        <div className='w-full h-96 text-2xl text-neutral-800 font-medium flex justify-center items-center flex-col '>No Trips Yet<div className='text-base font-normal text-neutral-500'>Please make reservations first</div></div>
    

    
    </>
    
}
      {reservation.map((trip)=>{   
        

        
        return(<>

<Card category={`${format(trip.startdate,'PP')} - ${format(trip.enddate,'PP')}`} location={trip.listing.locationValue} price={trip.totalprice} imagesrc={trip.listing.imagesrc.split('=')[0]} id={trip.id} night={false} cancelreservation={true} onclick={()=>{}}></Card>
</>

      );})}
    </>
  )
}

export default Trips
