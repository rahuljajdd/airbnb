
import { Progress } from "@/components/ui/progress"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { StarFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { IoStar } from 'react-icons/io5'
import { Card } from "../ui/card"
import ImageHorizontal from "./ImageHorizontal";
import ReviewBoard from "./ReviewBoard";
const ReviewSection = ({reviews}) => {
  return (
    <div className='border w-min flex rounded-xl h-auto  mx-auto mt-8 p-6 -translate-x-12   items-start gap-20 '>



<div className=" flex justify-between">

<div>

<div>

<div className='poppins font-medium text-2xl mb-4'> Reviews</div>
<div className=' text-xl text-red-600 flex items-center gap-1 pt-1'><IoStar></IoStar> <div className='text-3xl text-black poppins '>{ parseFloat(
  (
    reviews
      .map(item => Number(item.rating)) // Map to an array of numbers
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.length
  ).toString()
)}</div><div className=' text-[16px] text-gray-400'>({reviews.length})</div></div>

</div>






<div className="scale-90 w-72  poppins">



<div className="flex gap-2 mb-2  items-center text-sm font-medium  ">
 <div className="flex">5 Star</div>
<div>

<Progress  color="blue" className="w-48 h-2 " value={parseInt((reviews.filter((item)=>Number(item.rating)===5).length*100/reviews.length).toString())}  ></Progress>
</div>
{reviews.filter((item)=>Number(item.rating)===Number(5)).length*100/reviews.length}%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
 <div className="flex">4 Star</div>
<div>

<Progress className="w-48 h-2" value={parseInt((reviews.filter((item)=>Number(item.rating)===4).length*100/reviews.length).toString())}   ></Progress>
</div>
{reviews.filter((item)=>Number(item.rating)===Number(4)).length*100/reviews.length}%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
3 Star
<div>

<Progress className="w-48 h-2" value={parseInt((reviews.filter((item)=>Number(item.rating)===3).length*100/reviews.length).toString())}   ></Progress>
</div>
{parseInt((reviews.filter((item)=>Number(item.rating)===3).length*100/reviews.length).toString())}5

</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">

{reviews.filter((item)=>{Number(item.rating)===Number(2)}).length*100/reviews.length}%
<div>

<Progress className="w-48 h-2" value={parseInt((reviews.filter((item)=>Number(item.rating)===2).length*100/reviews.length).toString())}   ></Progress>
</div>

{reviews.filter((item)=>{Number(item.rating)===Number(1)}).length*100/reviews.length}%
</div>
<div className="flex gap-2 mb-2  items-center text-sm font-medium ">
1 Star
<div>

<Progress className="w-48 h-2" value={parseFloat((reviews.filter((item)=>item.rating===1).length*100/reviews.length).toString())}   ></Progress>
</div>
{parseFloat((reviews.filter((item)=>item.rating===1).length*100/reviews.length).toString())}%
</div>


</div>

</div>


</div>


<div>

<ImageHorizontal></ImageHorizontal>

{reviews.map((item)=><ReviewBoard reviews={item}></ReviewBoard>)}


</div>



    </div>


  )
}

export default ReviewSection