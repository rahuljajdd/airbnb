import React from 'react'

import { Card } from '../ui/card'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
const ImageHorizontal = () => {



const ref=React.useRef<HTMLDivElement>(null);



const scrollright=()=>{


    ref.current?.scrollBy({left:340,behavior:'smooth'})
}

const scrollleft=()=>{


    ref.current?.scrollBy({left:-340,behavior:'smooth'})
}
  return (
    <div>

<Card className="h-72 mt-5 w-[750px] ">

    
<div className="p-3 flex justify-between ">
    Photos and Reviews
<div className="flex  gap-2 p-[2px] bg-neutral-200 rounded-full">
    <div onClick={scrollleft} className=" size-7 rounded-full flex justify-center items-center border shadow bg-white  transform active:scale-95 active:bg-neutral-50 cursor-pointer "><IoIosArrowBack></IoIosArrowBack></div>
    <div onClick={ scrollright} className=" size-7 rounded-full flex justify-center items-center border shadow bg-white  transform active:scale-95 active:bg-neutral-50 cursor-pointer"><IoIosArrowForward></IoIosArrowForward></div>
   
</div>
</div>

<div ref={ref} className="w-full flex gap-2 px-3  overflow-x-auto scrollbar-hide scroll-smooth ">
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
  <div className="h-48 w-40 flex-shrink-0">
    <img className="h-full w-full object-cover rounded-lg" src="https://th.bing.com/th/id/OIP.kZ6oCa7ZJNty0mzSaG8D5QHaE3?rs=1&pid=ImgDetMain" alt="image" />
  </div>
</div>


</Card>
    </div>
  )
}

export default ImageHorizontal