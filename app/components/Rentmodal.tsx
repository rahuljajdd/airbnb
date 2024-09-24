
//@ts-nocheck
'use client'
import { categories } from "./Categories"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert"
import { Checkbox } from "@/app/ui/checkbox"
import { MdClose } from "react-icons/md";
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import CurrencyInput from 'react-currency-input-field';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { TbPhotoPlus } from 'react-icons/tb';
import { BiCross, BiCurrentLocation, BiWifi, BiWifi1 } from "react-icons/bi";
import Categoryinput from './Categoryinput';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import Categories from "./Categories";
import { Context } from "./UserProvider";
import axios from 'axios';
import { useContext } from "react";
import dynamic from 'next/dynamic';

import Counter from './Counter';


import { Button } from "@/app/ui/button";
import { FcWiFiLogo } from "react-icons/fc";
import { FaDog, FaMountain, FaParking, FaTv } from "react-icons/fa";
import { FaCross, FaKitchenSet } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { userInfo } from "os";
import { Cross2Icon } from "@radix-ui/react-icons"







enum steps{
   CATEGORY =0,
   LOCATION=1,
   INFO=2,
   IMAGES=3,
   DESCRIPTION=4,
   PRICE=5
  } 

const Rent= ({login,setregister,refetch,listings,register:any,setlistings}:any) => {

const router=useRouter();
const [dropup, setdropup] = useState(false)
const [dropdown, setdropdown] = useState(false)
const [loading, setloading] = useState(false)
const [step, setstep] = useState(steps.CATEGORY);







const [geo, setgeo] = useState([48.8566,2.3522])
const [Location, setLocation] = useState('')





  const{register,formState:{errors},watch,setValue,handleSubmit,reset,getValues}=useForm({
  
      defaultValues:{
          category: '',
          location: '',
     
          guestCount:0,
          roomCount:0,
          bathroomCount:0,
          imageSrc:'',
          price:0,
          title:'',
          description:'',
          tv:false
  ,wifi:false,
  pets:false,
  view:false,
  kitchen:false,
  parking:false,


      }
  })
  const [next, setnext] = useState(true);
  

  
  
  //    const Map =useEffect(() => dynamic(()=>import('./Map'),{ssr:false}) , [loctation])
  const Map = dynamic(() => import('./Map'), { ssr: false });
  
  
  
  console.log("bahi hye bhi rerender");
  const location=watch("location");
  const category=watch("category");
  const guestCount=watch('guestCount');

  const roomCount =watch('roomCount');
  const bathroomCount=watch('bathroomCount');
  const imageSrc =watch('imageSrc');
  const price=watch('price');
  const title=watch('title');
  const extrainfo=watch('extrainfo')
  const tv=watch('tv');
  const wifi=watch('wifi');
  const pets=watch('pets');
  const view=watch('view');
  const kitchen=watch('kitchen');
  const parking=watch('parking');

  




  

  const context = useContext(Context);

  // Check if the context is defined
  if (!context) {
    throw new Error('MyComponent must be used within a UserProviders');
  }

  const { userInfo } = context;

const{toast}=useToast();



  const description =watch('description'); 
  // const Map= useMemo(()=> dynamic(()=>import('./Map')),{ssr:false},[location])

  const setCustomvalue=(id:any,value:any)=>{

      setValue(id,value,{
          shouldDirty:true,
          shouldTouch:true,
          shouldValidate:true
      })
  }




let bodycontent=(<>
<>
    <div className="flex justify-between p-3 border-b"> <div></div>Airbnb your home  </div>
    <div className="p-3 font-bold">Which of the best describes your place</div>
    <div className="px-3 text-gray-500 text-sm">Pick a category</div>
    
    <div className="w-full p-4">
        <div className="max-h-[525px] flex flex-wrap md:gap-5 gap-1 overflow-y-auto">
            {categories.map((items: any) => {
                return (
                    <Categoryinput 
                    
                        onclick={(category) => {  console.log(category); setCustomvalue('category', category) }} 
                        selected={category === items.name} 
                        name={items.name} 
                        icon={items.icon} 
                        key={items.name} // Add key for better React rendering
                    />
                );
            })}
        </div>
    </div>
    
    <div className="flex justify-between">
        <div></div>
        <Button 
            className="px-4 py-2 m-2 mx-3 text-base md:px-20 md:py-5 md:text-lg" 
            disabled={false}  
            variant={"destructive"} 
            onClick={() => { 
                if (step !== 5) { 
                    const newStep = step + 1; 
                    setstep(newStep); 
                } 
            }}
        > 
            Next 
        </Button>
    </div>
</>
  
  </>
)


 
 const getlocation=function(){                          

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
  
    function success(pos:any) {
      const crd = pos.coords;
      console.log(crd);
      console.log("Your current position is:");
      console.log(`Latitude: ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
     const l=[crd.latitude,crd.longitude];
     setgeo(l);
   
   
     axios.get(` https://geocode.maps.co/reverse?lat=${crd.latitude}&lon=${crd.longitude}&api_key=66439f8cd92b5061250040ubt6be173`).then((res)=>{const address=res.data.display_name; console.log(address);  setCustomvalue('location',`${address}?${crd.latitude}?${crd.longitude}`) }).catch((e)=>{console.log(e);})
    }
  
    function error(err:any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);


   } 




//   const [item, setitems] = useState([]);




const [item, setitem] = useState([])

const handleOnSearch = (string, results) => {
// onSearch will have as the first callback parameter
axios.get(` https://api.locationiq.com/v1/autocomplete?key=pk.deb87b54fd43801d7fd7b12571d34439&q=${string}`).then((res)=>{ setitem(res.data); }).catch(e=>console.log(e))
// the string searched and for the second the results.
console.log(string, results)
}

const handleOnHover = (result) => {
  // the item hovered
  console.log(result)
}

const handleOnSelect = (item) => {
  // the item selected
  setgeo([Number(item.lat),Number(item.lon)]);
  // `
  setCustomvalue("location",`${item.display_name}?${item.lat}?${item.lon}`);


}

const handleOnFocus = () => {
  console.log(item);
    console.log('Focused')
  }
  
  const formatResult = (item) => {
      return (
    <>

      <span style={{ display: 'block', textAlign: 'left' }}> {item.display_name}</span>
    </>
  )
}























































const  searchlocation=function(){
  
  const add= location.split(' ');
  const address=add.join('+');
  
  axios.get(`https://geocode.maps.co/search?q=${address}&api_key=66439f8cd92b5061250040ubt6be173`).then((res)=>{const addres=res.data; console.log(addres); setgeo([address[0].lat,address[0].lon]);  setCustomvalue('location',address) }).catch((e)=>{console.log(e);})
  
  
}




if(step===steps.LOCATION){
  bodycontent=(
      <>
       <div className=''>
    <div className="flex justify-center p-3 border-b">Airbnb your home</div>
    <div className="p-3 font-bold">Where is your place located?</div>
    <div className="px-3 text-gray-500 text-sm">Help guests find you</div>

    <div className="mt-5">
        <div style={{ width: "100%", maxWidth: 600 }} className="z-50 ">
            <ReactSearchAutocomplete
             
                items={item}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                styling={{ zIndex: 50, fontSize: "15px" }}
                fuseOptions={{ keys: ["display_name"] }}
                resultStringKeyName="display_name"
                showItemsOnFocus
                formatResult={formatResult}
            />
        </div>

      

        <div>
            {/* <button onClick={async()=>{ await getlocation()}} className="border p-2 mt-1  rounded-lg text-neutral-700 flex items-center">
                <BiCurrentLocation />
                Use Current Location
            </button> */}
        </div>

        <div className="min-h-96 pt-2 mb-6">
            <Map geo={geo} />
        </div>
    </div>

    <div className="flex md justify-between w-full mt-3 gap-3">
    <Button
      className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
      variant={"ghost"}
      onClick={() => {
        setstep(step - 1);
      }}
    >
      Back
    </Button>

    <Button
      className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
      disabled={location.length===0}
      variant={"destructive"}
      onClick={() => {
        if (step !== 5) {
          const newstep = step + 1;
          setstep(newstep);
        } else {
          submit();
        }
      }}
    >
      Next
    </Button>

</div>
</div>
      </>
  )

}



if(step===steps.INFO){

  bodycontent=(
    <>
    <>
<div className="flex justify-center p-3 border-b">Airbnb your home</div>

<div className="p-3 font-bold text-lg sm:text-xl">
 Share some basics about your space
</div>

<div className="px-3 text-gray-500 text-sm sm:text-base">
 What amenities do you have?
</div>

{/* Counters for Guest, Rooms, Bathrooms */}
<div className="p-3 space-y-4">
 <Counter
   Id="guestCount"
   value={guestCount}
   setCustomvalue={setCustomvalue}
   subtitle="How many guests do you allow?"
   title="Guest"
 />
 <Counter
   Id="roomCount"
   value={roomCount}
   setCustomvalue={setCustomvalue}
   subtitle="How many rooms do you have?"
   title="Rooms"
 />
 <Counter
   Id="bathroomCount"
   value={bathroomCount}
   setCustomvalue={setCustomvalue}
   subtitle="How many bathrooms do you have?"
   title="Bathrooms"
 />
</div>

{/* Buttons for navigation */}
<div className="flex md justify-between w-full mt-3 gap-3">
 <Button
   className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
   variant={"ghost"}
   onClick={() => {
     setstep(step - 1);
   }}
 >
   Back
 </Button>

 <Button
   className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
   disabled={roomCount === 0 || bathroomCount === 0 || guestCount === 0}
   variant={"destructive"}
   onClick={() => {
     if (step !== 5) {
       const newstep = step + 1;
       setstep(newstep);
     } else {
       submit();
     }
   }}
 >
   Next
 </Button>
</div>
</>






     </>
  )
}





function convertImageToBase64(file) {
return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
}

const [loader, setloader] = useState(false);

const [imgs, setimgs] = useState<null|any[]>([])

useEffect(() => {
  setCustomvalue('imageSrc', imgs.join('='));
}, [imgs]);

if(step===steps.IMAGES){
  bodycontent=(<>
  
  





{/* 
<CldUploadWidget  uploadPreset='oscthk8u'  options={{maxFiles:4}}  onQueuesEnd={(result)=>{console.log( result.info.files.map(item=>item.uploadInfo.secure_url));      }} >
{
({open})=>{
  return(
    <div className='cursor-pointer p-20 border-dashed border-2 h-80 mt-5 flex items-center justify-center rounded-lg relative' onClick={open}>
    <div className=' flex-col flex items-center justify-center'><TbPhotoPlus size={50}></TbPhotoPlus><div></div>Click to upload</div> */}
{/* {true&&<div className='w-full h-full absolute'><img className='w-full h-full ' src={}></img></div>} */}
          {/* </div>
      )
      
      }
      }
      
      </CldUploadWidget> */}






<>
<div className="">
  <div className="flex justify-center p-3 border-b">Airbnb your home</div>

  <div className="p-3 font-bold text-lg sm:text-xl">
    Add some photos of your space
  </div>

  <div className="px-3 text-gray-500 text-sm sm:text-base">
    Let Guests know how your place looks like!
  </div>

  <Alert className="mt-2">
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      The first uploaded image will be the thumbnail image by default.
    </AlertDescription>
  </Alert>

  <Button className="m-3 p-4 relative">
    {loader?'uploading..':'upload'}
    <input
      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
      type="file"
      onChange={async (e) => {
        const file = e.target.files[0];
        const base64Image = await convertImageToBase64(file);
        setloader(true)
        axios.post('/api/imageupload', { path: base64Image }).then((res) => {
          setimgs([...imgs, res.data.url]);
        setloader(false)
          console.log(imageSrc);
        });
      }}
    />
  </Button>

  <div className="gallery max-h-96 min-h-60 overflow-y-auto  overflow-x-hidden">
    {imgs?.map((item, index) => (
      <div key={index} className="gallery-item relative">
        <div
          className="absolute top-0 right-0 mx-5 mt-5 text-white rounded-lg bg-red-600 p-1 z-40 cursor-pointer"
          onClick={() => {
            setimgs(imgs.filter((items) => items !== item));
            setCustomvalue('imageSrc', imgs?.join('='));
          }}
        >
          <MdClose />
        </div>
        <img src={item} className="rounded-lg m-3" alt="uploaded" />
      </div>
    ))}
  </div>

  {/* Navigation Buttons */}
  <div className="flex md justify-between w-full mt-3 gap-3">
    <Button
      className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
      variant={"ghost"}
      onClick={() => {
        setstep(step - 1);
      }}
    >
      Back
    </Button>

    <Button
      className="px-10 py-4 sm:px-20 sm:py-5 m-2 mx-3 text-lg"
      disabled={imgs.length===0}
      variant={"destructive"}
      onClick={() => {
        if (step !== 5) {
          const newstep = step + 1;
          setstep(newstep);
        } else {
          submit();
        }
      }}
    >
      Next
    </Button>
  </div>
</div>

</></>

  )
}


if(step===steps.DESCRIPTION){
   
   bodycontent=(
     <>
      <div className="flex justify-center p-3 border-b">Airbnb your home</div>
      <div className="p-3 font-bold">How would you describe your place?</div>
      <div className="px-3 text-gray-500 text-sm">Short and sweet works best!</div>
      
      <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          className="border p-3 w-full my-3 rounded-lg" 
          onChange={(e) => setCustomvalue('title', e.target.value)} 
      />
      
      <textarea 
          value={description} 
          placeholder="Description" 
          className="border p-4 w-full my-3 rounded-lg" 
          onChange={(e) => setCustomvalue('description', e.target.value)} 
      ></textarea>
      <diiv>Extra info</diiv>
      <textarea type='text'  placeholder='Boat Rentals: Allow users to book boat rides or sunset cruises directly from the platform.(STRICLY FOLLOW abve formate for wriring extra info)'  className='border p-4 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('extrainfo',e.target.value); }}  ></textarea>

      
      <div className="font-bold">Amenities</div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex items-center gap-3">
                  <Checkbox /> <BiWifi /> Free wifi <IoMdAdd />
              </AlertTitle>
          </Alert>
          
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex justify-between items-center gap-3">
                  <Checkbox /> <FaDog /> Pets allowed <IoMdAdd />
              </AlertTitle>
          </Alert>
          
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex justify-between items-center gap-3">
                  <Checkbox /> <FaMountain /> Window view <IoMdAdd />
              </AlertTitle>
          </Alert>
          
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex justify-between items-center gap-3">
                  <Checkbox /> <FaParking /> Free parking <IoMdAdd />
              </AlertTitle>
          </Alert>
          
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex justify-between items-center gap-3">
                  <Checkbox /> <FaKitchenSet /> Kitchen <IoMdAdd />
              </AlertTitle>
          </Alert>
          
          <Alert className="mt-2 w-full flex items-center">
              <AlertTitle className="flex justify-between items-center gap-3">
                  <Checkbox /> <FaTv /> TV <IoMdAdd />
              </AlertTitle>
          </Alert>
      </div>
      
      <div className="flex justify-between w-full mt-3 gap-3">
          <Button 
              className="px-10 py-2 m-2 mx-3 text-base md:px-20 md:py-5 md:text-lg" 
              variant={"ghost"} 
              onClick={() => setstep(step - 1)}
          >
              Back
          </Button>
          
          <Button 
              className="px-10 py-2 m-2 mx-3 text-base md:px-20 md:py-5 md:text-lg" 
              disabled={title?.length === 0 || description?.length === 0} 
              variant={"destructive"} 
              onClick={() => { if (step !== 5) { setstep(step + 1); } else { submit(); } }}
          >
              Next
          </Button>
      </div>
  </>

  )



}

const [Price, setPrice] = useState(0)

if(step===steps.PRICE){
 
 bodycontent=(
    <>
      <div>
  
  <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
      <div className=' p-3  font-bold'>Now,set your price</div>
      <div className='  px-3 text-gray-500  text-sm'>How much you charge per night</div>
      <CurrencyInput prefix='$' className='border p-2 m-3 mt-7'  value={Price} allowNegativeValue={false} maxLength={3} placeholder='Price' onValueChange={(value)=>{ setPrice(value); setCustomvalue('price',value)}}></CurrencyInput>
      </div>

      <> <div className='flex justify-between  w-full mt-3 gap-3'>

<Button className="md:px-20 px-10 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
<Button className="md:px-20 px-10 py-5 m-2 mx-3 text-lg" disabled={!(price>0)||loader}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> {loader?"creating...":"create"}</Button>


</div></>
      </>

  )
}

const submit=handleSubmit((data)=>{
  setloader(true);
   console.log(data);
  if(step!==5){
      return
  }

  
  axios.post('/api/listings',{data:data,user:userInfo}).then((res)=>{
    
    const{error}=res.data
    if(error){
      return toast({title:'Error',description:error})
    }else{


      toast({title:'Succes',description:'listing vreated succes fully'}) 
      setstep(steps.CATEGORY);
      ref.current.click()

    }
    setloader(false)

      axios.get('api/listings').then((res)=>{setlistings(res.data);}).catch((e)=>{console.log(e);})


  }).catch((e)=>{console.log(e)});

})

const ref = React.useRef();


  return (
  < >
  

















{register&&
  
  
  <Dialog   open={true} onOpenChange={()=>{setregister(false)}} >
<DialogTrigger ref={ref}></DialogTrigger>
<DialogContent className="h-screen md:max-h-[80vh] md:overflow-hidden overflow-y-auto">

<div className="w-full ">


{bodycontent}




</div>
</DialogContent>
</Dialog>
  
  

  

}



{/* 
   <div className='w-screen absolute z-10 bg-black  h-screen opacity-0 flex justify-center items-center cursor-pointer 'onClick={()=>{setdropdown(true); setTimeout(() => {
setregister(false);
}, 150); }}> </div> */}









{/* 
  </div> */}

{/* <div className=' flex justify-center   w-full h-full ' >
    <div className={`w-full h-screen md:h-auto md:w-2/4 max-h-screen bg-white absolute z-40  md:mt-14  rounded-lg px-4 pb-5 duration-200  transition-all ${ dropdown&& ` opacity-0 `}`}>
   {bodycontent}


   {(step>0)&&<> <div className='flex justify-between  w-full mt-3 gap-3'>
      
      <div className=' border-2 text-gray-700 rounded-lg  p-2  justify-center flex  border-gray-700 w-full  cursor-pointer' onClick={()=>{setstep(step-1)}}>Back</div>
      <div className='  border-2 border-red-600 justify-center p-2 flex items-center text-white rounded-lg bg-red-600 w-full  cursor-pointer'   onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}>{(step===5)?'Create':'Next'}</div>
      
      </div></>}
  {(step===0)&&<div className=' flex justify-center mt-6 text-2xl bg-red-600 p-3 rounded-lg text-white cursor-pointer' onClick={()=>{ const newstep=step+1; setstep(newstep); setnext(!next)}}>Next</div>}
    </div>
  </div> */}
  </>
)
}

export default Rent