import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LatestJobCard({job}) {

  
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='flex flex-col gap-5 shadow-xl p-5 w-100 bg-gray-100 rounded-2xl'>
      <div> 

      <h1 className='text-[100] font-bold-[100] mb-1'>{job?.company?.name}</h1>
      <p className='text-[gray]'>{job?.company?.location} </p>
      </div>

      <div>
        <h1 className=' text-xl font-bold mb-1'>{job?.title}</h1>
        <p >{job?.description}</p>
      </div>

      <div className='flex gap-10'>
        <Badge  className='text-sm text-[#2b2bcf]'>{job?.position} position</Badge>
        <Badge className='text-sm text-[#e81f1f]'>{job?.jobType}</Badge>
        <Badge className='text-sm text-[#8f05da]'>{job?.salary}LPA</Badge>
      </div>
    </div>

  )
}
