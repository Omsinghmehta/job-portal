import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toggleBookmark } from "./BookmarksAction";
import { useDispatch, useSelector } from "react-redux";

export default function JobCard({ job }) {
  const {bookmarks}=useSelector(store=>store.bookmarks);
  const isbookmark=bookmarks.includes(job?._id);
  const dispatch = useDispatch();

  const handleBookmark = () => {
    dispatch(toggleBookmark(job?._id));
  };

  const daysAgoFunction = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currDate = new Date();

    const diff = Math.floor((currDate - createdAt) / (1000 * 60 * 60 * 24));
    return diff;
  };
  const daysLeft = (deadline) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return diff <= 0 ? "Expired" : `${diff} days left`;
  };

  const navigate = useNavigate();
  return (
    <div className="max-w-xl shadow-xl h-[45vh] w-85 p-4">
      <div className="flex justify-between">
        <p>
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {isbookmark?<BookmarkCheck className="rounded-ful rounded-full shadow-md size-xl "></BookmarkCheck>:<Bookmark className="rounded-ful rounded-full shadow-md size-xl "></Bookmark>}
        
      </div>

      <div className="flex mt-3">
        <Avatar className="mr-3">
          <AvatarImage src={job?.company?.logo} className="h-8 w-8  " />
        </Avatar>
        <div className="">
          <h1 className="font-[600] text-xl">{job?.company?.name}</h1>
          <p className="text-gray-400">{job?.company?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-[700] text-[300]">{job?.title}</h1>
        <p className="text-gray-500 ">{job?.description}</p>

        <div className="flex gap-5 mt-3">
          <Badge className=" font-bold text-[#2b2bcf]">
            {job?.position} position
          </Badge>
          <Badge className="font-bold text-[#e81f1f]">{job?.jobType}</Badge>
          <Badge className="font-bold text-[#8f05da]">{job?.salary} LPA</Badge>
        </div>
      </div>

      <div className=" mt-4 space-x-1">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          className="border-gray-800 bg-gray-300 hover:bg-gray-200"
        >
          Details
        </Button>
        <Button
          className="bg-[#1010f1] text-white shadow hover:bg-[#3d3dff]"
          onClick={handleBookmark}
        >
         { isbookmark?"Unsave": "Save For Later"}
        </Button>
      </div>
       <div className="flex justify-between mt-3">
        <p className="text-red-600  ">
          Deadline: {job?.deadline?.split("T")[0]} 
        </p>
        <p>[{daysLeft(job?.deadline)}]⌛</p>
      </div>
    </div>
  );
}
