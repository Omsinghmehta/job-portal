import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleJob } from "./Redux/jobSlice";
import { toast } from "sonner";

export default function JobDescription() {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const isInitiallyApply = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );

  const [isApply,setApply]=useState(isInitiallyApply);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setApply(true);
        const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]};
        dispatch(setSingleJob(updateSingleJob))
        toast.success(res?.data?.message || "Successfully Applied");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        
        setApply(res.data?.job?.applications?.some(application=>application.applicant===user?._id));
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        Loading job details... 
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between max-w-6xl mx-auto mt-12">
        <div>
          <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
          <div className="flex gap-5 mt-6">
            <Badge className=" font-bold text-sm text-blue-600">
              {singleJob.position} position
            </Badge>
            <Badge className="font-bold text-sm text-red-600">
              {singleJob.jobType}
            </Badge>
            <Badge className="font-bold text-sm text-violet-600">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>

        <div>
          {!isApply ? (
            <Button
              className="bg-blue-700 text-white"
              onClick={applyJobHandler}
            >
              Apply
            </Button>
          ) : (
            <Button
              disabled
              className="bg-blue-700 text-white cursor-not-allowed "
            >
              Already Applied
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl text-gray-600 mt-5 mb-3">Job Description</h1>
        <hr className="mb-5" />

        <div>
          <h1 className="font-bold my-2 text-black">
            {" "}
            Role:<span className="font-normal ml-5">{singleJob.title}</span>
          </h1>
          <h1 className="font-bold my-2">
            {" "}
            Location:
            <span className="font-normal ml-5">{singleJob.location}</span>
          </h1>
          <h1 className="font-bold my-2">
            {" "}
            Description:
            <span className="font-normal ml-5">{singleJob.description}</span>
          </h1>
          <h1 className="font-bold my-2">
            {" "}
            Experience:
            <span className="font-normal ml-5">{singleJob.experience}yrs</span>
          </h1>
          <h1 className="font-bold my-2">
            {" "}
            Salary:
            <span className="font-normal ml-5">{singleJob.salary}LPA</span>
          </h1>
          <h1 className="font-bold my-2">
            {" "}
            Total Applicant:
            <span className="font-normal ml-5">
              {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-2">
            Posted Date:
            <span className="font-normal ml-5">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
