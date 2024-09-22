//@ts-nocheck
"use client"


import { Button } from "@/app/ui/button"


import  { ReactElement, useEffect } from 'react'
import { TbMountain } from 'react-icons/tb'
import { RiAccountCircleFill } from 'react-icons/ri'
import { string } from 'zod'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Badge } from "@/app/ui/badge"

import countries from 'world-countries'
import Categories from './Categories'
import { categories } from './Categories'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import { Icon } from 'leaflet'
import { FaCar } from "react-icons/fa6";


import { url } from 'inspector'
import { useParams, usePathname } from 'next/navigation'


import { useSession } from 'next-auth/react'
import { compareSync } from 'bcrypt'

import { constants } from 'buffer'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaLocationDot } from "react-icons/fa6";


import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"


import React from 'react'
import axios from 'axios';
import Categoryinput from './Categoryinput';
import { useState } from 'react';
import { IoSearchCircle } from "react-icons/io5";
import 'react-loading-skeleton/dist/skeleton.css'
import dynamic from 'next/dynamic';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"
import { Slider } from "@/app/ui/slider"
import { useRouter } from "next/navigation"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs"
import{DateRange} from'react-date-range';
import { addDays } from 'date-fns';
import { useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Toast } from "@radix-ui/react-toast"
const Filter = () => {
  
  const pathname=usePathname();
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const router=useRouter();
  function applyfilters(){
    

    if(params.get('distance')){
      params.delete('distance');
    }
    params.set('min',min[0].toString());
    
    params.set('max',max[0].toString());
    params.set('geo',geo?.toString());
    params.set('range:',range[0].toString())
    console.log('hello');
    console.log(state);
    params.set('endDate:',state[0].endDate.toString())
    params.set('startDate:',state[0].startDate.toString())
    router.push(`${pathname}?${params.toString()}`);
    
    
  };
  const [state, setState] = useState([
    {
      startDate: new Date(params.get('startDate')),
      endDate: new Date(params.get('endDate')),
      key: 'selection'
    }
  ]);
  






  const Map = dynamic(() => import('./Map'), { ssr: false });


console.log([Number(params.get('geo')?.split(',')[0]),Number(params.get('geo')?.split('')[1])]);

    const [geo, setgeo] = useState<null|Number[]>(null);
const [step, setstep] = useState('location')
  const [item, setitem] = useState([])
  const [location, setlocation] = useState('');
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
      
      // // `
      setlocation(`${item.display_name}?${item.lat}?${item.lon}`);
  
  
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
  
  
  
  
  
const [range, setrange] = useState([300])
const [category, setcategory] = useState<any>([])
const [Categories, setCategories] = useState<any>(categories)
const [min, setmin] = useState(([Number(params.get('min'))]));
const [max, setmax] = useState(([Number(params.get('max'))]));
const{toast}=useToast()
const items=Categories
return (
<Dialog>
  <DialogTrigger>  
    {/* Dialog Trigger for larger and smaller screens */}
    <div className="md:flex hidden border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between">
      <div className="border-r px-3 hidden items-center cursor-pointer md:flex">Anywhere</div>
      <div className="border-r px-3 flex items-center cursor-pointer">Anywhere</div>
      <div className="pl-3 text-gray-500 hidden items-center cursor-pointer md:flex md:w-auto">Add Guest</div>
      <div className="text-rose-700"><IoSearchCircle size={35} /></div>
    </div>
    <div className="flex items-center md:hidden rounded-full bg-white shadow-md px-2">
      Search 
      <div className="text-rose-700"><IoSearchCircle size={35} /></div>
    </div>
  </DialogTrigger>
  {/* Dialog Content */}
  <DialogContent className="mt-0 pb-6  md:px-7 px-3 overflow-hidden rounded-lg   md:scale-100  scale-90  w-full h-screen flex flex-col  justify-start items-center  md:h-auto  overflow-y-auto md:w-[700px]">
    {/* Scrollable Area for Dialog Content */}

      <DialogHeader>
        <DialogTitle className="pb-4">Search Filters</DialogTitle>

        <DialogDescription className="hidden md:block">
          Refine your search to find the perfect place to stay
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="dates">Dates</TabsTrigger>
          <TabsTrigger value="price">Price</TabsTrigger>
        </TabsList>

        {/* Location Tab */}
        <TabsContent className="md:w-[450px] w-full pl-4 md:pl-0"  value="location"> 
          <h1 className='text-xl p-2  md:pl-0 pl-3'>Where are you going?</h1>
          <p className='text-sm px-1   md:pl-0 pl-3 mb-2'>All the listings will be near the chosen location</p>
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
          <div className='min-h-96 w-screen md:w-full pt-2 md:mb-6 mb-2'>
            <div className=" md:pl-0 pl-3">Set the radius for the location search</div>
            <div className="flex gap-4   md:px-0 px-3">
              <Slider defaultValue={[30]} value={range} onValueChange={(value) => setrange(value)} max={100} step={1} />
              {range && (
                <div className='p-3 rounded-lg border text-gray-600'>
                  {range[0] === 100 ? <div>{range[0] * 10}Km+</div> : <div>{range[0] * 10}Km</div>}
                </div>
              )}
            </div>

            <div className="scale-x-95 md:scale-100 pr-4 md:pr-0 w-full ">

            <Map geo={geo}></Map>
            </div>
          </div>
        </TabsContent>

        {/* Dates Tab */}
        <TabsContent className="pb-4" value="dates">
          <h1 className='text-xl p-2'>When are you going?</h1>
          <p className='text-sm px-1 mb-2'>All the listings will be available on the chosen Dates</p>
          <div className='w-[400px] text-sm flex justify-center border-b border-black'>
            <DateRange
              onChange={(item) => { setState([item.selection]); console.log(item); }}
              moveRangeOnFirstSelection={false}
              disabledDates={[]}
              ranges={state}
              direction="horizontal"
            />
          </div>
        </TabsContent>

        {/* Price Tab */}
        <TabsContent value="price">
          <h1 className='text-xl p-2'>What are your price preferences?</h1>
          <p className='text-sm px-1 mb-2'>All the listings will be according to the selected price range</p>
          <div className='p-4'>
            <div>Min</div>
            <div className='flex gap-4'>
              <Slider defaultValue={[30]} value={min} onValueChange={(value) => setmin(value)} max={100} step={1} />
              {min && <div className='p-3 rounded-lg border bg-slate-900 text-white'>${min[0] * 10}</div>}
            </div>
          </div>
          <div>Max</div>
          <div className='flex gap-4 px-3'>
            <Slider defaultValue={[30]} value={max} onValueChange={(value) => setmax(value)} max={100} step={1} />
            {max && <div className='p-3 rounded-lg border bg-slate-900 text-white'>${max[0] * 10}</div>}
          </div>
          <Button variant="destructive" onClick={()=>{ applyfilters();   toast({title:'succes',description:'filter succefully applied'})  }}>Apply</Button>
        </TabsContent>
      </Tabs>

      {/* Apply Filters Button */}


  </DialogContent>
</Dialog>


  )
}

export default Filter