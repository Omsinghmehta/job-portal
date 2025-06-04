import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hook/useGetAllJobs";
import { setSearchQuery } from "./Redux/jobSlice";
import { motion } from "framer-motion";
export default function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  // const {bookmarks}=useSelector(store=>store.bookmarks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, []);
  return (
    <div>
      <Navbar />
      <motion.div initial={{opacity:0, x:100}} animate={{opacity:1,x:0}} transition={{duration:0.3}} className="max-w-7xl mx-auto mt-11">
        <h1 className="font-bold text-2xl">Search Result:({allJobs.length})</h1>

        <div className="grid grid-cols-3  gap-3 mt-12 max-w-7xl">
          {allJobs.map((job, idx) => (
            <JobCard id={job._id} job={job} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
