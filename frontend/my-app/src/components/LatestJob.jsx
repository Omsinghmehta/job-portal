import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LatestJob() {
    const {allJobs}=useSelector(store=>store.job);
     const latestJobs = [...allJobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  return (
    <div className='px-4 md:gap-x-12 mw-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-[#1717a2] ml-30'>Latest & Top <span className='text-black'>Job Openings</span></h1>
        <div className='grid  grid-cols-1  md:grid-cols-3 gap-y-9 gap-x-1 ml-30 my-10'>

          {
           ( latestJobs.length<=0)?<span>Jobs Not Found</span>
:            latestJobs.slice(0,6).map((job,idx)=>(
                <LatestJobCard  key={job._id} job={job} />
            ))
          }
        </div>
    </div>
  )
}
