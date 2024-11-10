
import { Progress } from "@/components/ui/progress"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { StarFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { IoStar } from 'react-icons/io5'
import { Card } from "./ui/card"
import ImageHorizontal from "./ImageHorizontal";
import ReviewBoard from "./ReviewBoard";

const ReviewSection = () => {
  return (
    <div className='border w-min flex rounded-xl h-auto  mx-auto mt-8 p-6 -translate-x-12   items-start gap-20 '>



<div className=" flex justify-between">

<div>

<div>

<div className='poppins font-medium text-2xl mb-4'>Product Reviews</div>
<div className=' text-xl text-red-600 flex items-center gap-1 pt-1'><IoStar></IoStar> <div className='text-3xl text-black poppins '>4.99</div><div className=' text-[16px] text-gray-400'>(215)</div></div>

</div>






<div className="scale-90 w-72  poppins">



<div className="flex gap-2 mb-2  items-center text-sm font-medium  ">
 <div className="flex">5 Star</div>
<div>

<Progress  color="blue" className="w-48 h-2 " value={85}  ></Progress>
</div>
85%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
 <div className="flex">5 Star</div>
<div>

<Progress className="w-48 h-2" value={20}  ></Progress>
</div>
20%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
5 Star
<div>

<Progress className="w-48 h-2" value={45}  ></Progress>
</div>
45%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
5 Star
<div>

<Progress className="w-48 h-2" value={85}  ></Progress>
</div>
85%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
5 Star
<div>

<Progress className="w-48 h-2" value={5}  ></Progress>
</div>
5%
</div>


</div>

</div>


</div>


<div>

{/* <ImageHorizontal></ImageHorizontal> */}


<ReviewBoard></ReviewBoard>

</div>



    </div>


  )
}

export default ReviewSection