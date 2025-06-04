import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { motion } from "framer-motion";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
export default function Job() {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
const [filterjobs,setFilterJobs]=useState(allJobs);
  useEffect(() => {
    if (searchQuery) {
        const filtered=allJobs.filter((job)=>(
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()) 
          || job.location.toLowerCase().includes(searchQuery.toLowerCase()) 
        ))
        setFilterJobs(filtered)
    
    } else {
      setFilterJobs(allJobs)
    }
  }, [searchQuery, allJobs]);

  return (
    <>
      <Navbar />
      <div className="mt-10 max-w-full max-h-full">
        <div className="flex max-w-7xl mx-auto max-h-5xl">
          <div className="w-[15%]  flex gap-5 flex-col mr-3">
            <FilterCard />
          </div>

          <motion.div initial={{opacity:0, x:100}} animate={{opacity:1,x:0}} transition={{duration:0.3}} className="grid  grid-cols-1 md:grid-cols-3 gap-5 overflow-y-auto max-h-150 max-w-full ">
            {filterjobs.length <= 0 ? (
              <span>Jobs Not Found</span>
            ) : (
              filterjobs.map((job, idx) => <JobCard key={job._id} job={job} />)
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
