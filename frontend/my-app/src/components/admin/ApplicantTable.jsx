import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";

const shortlistingStatus = [`Accepted`, `Rejected`];

export default function ApplicantTable() {
  const { applicants } = useSelector((store) => store.application);
//   console.log(applicants);

  const statusHandler=async(status,id)=>{
    try {
        
        const res=await axios.put(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true});
        if(res.data.success)
        toast.success(res?.data?.message)
    } catch (error) {
        toast.error("Error Occured")
    }

  }
  return (
    <div className="max-w-7xl mx-auto">
      <Table >
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants?.applications?.map((item) => (
              <TableRow className='border-0'> 
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {
                    (item?.applicant?.profile?.resume)?<Link
                    to={item?.applicant?.profile?.resume}
                    className="text-blue-500"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </Link>:<span>NA</span>
                  }
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <Popover>
                  <PopoverTrigger className="ml-3 cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit h-fit space-y-2 bg-white" >
                    {shortlistingStatus.map((status) => (
                      <div className="cursor-pointer"onClick={()=>statusHandler(status,item._id)}>
                        <span className="flex gap-1">{status}<span className={(status!=='Accepted')?'text-red-500':'text-green-500'}>{(status!=='Accepted')?<X/>:<Check/>}</span></span>
                       
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableRow>
            ))
          ) : (
            <TableRow>NA</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
