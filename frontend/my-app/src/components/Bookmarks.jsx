import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "./BookmarksAction";
import JobCard from "./JobCard";
import Navbar from "./shared/Navbar";
import {motion} from "framer-motion"

export default function Bookmarks() {
  const { allJobs } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const userId = user?._id;

  const { bookmarks } = useSelector((store) => store.bookmarks);
  const bookmarkedJobs = allJobs.filter((job) => bookmarks.includes(job._id));

  
  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarks(userId));
    }
  }, [userId, bookmarks]);

  console.log(bookmarks);
  return (
    <>
      <Navbar />

      <h1 className="max-w-7xl mx-auto mt-10 text-2xl font-bold underline">
        Your Bookmarks: ({bookmarks.length})
      </h1>
      <motion.div initial={{opacity:0, x:100}} animate={{opacity:1,x:0}} transition={{duration:0.3}} className="mt-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {bookmarkedJobs?.length > 0 ? (
          bookmarkedJobs?.map((job) => <JobCard key={job?._id} job={job} />)
        ) : (
          <p>No bookmarked jobs found.</p>
        )}
      </motion.div>
    </>
  );
}
