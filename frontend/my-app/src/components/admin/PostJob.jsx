import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    jobType: "",
    location: "",
    position: 0,
    salary: "",
    experience: "",
    requirements: "",
    companyId: "",
    deadline:""
  });
  // useGetAllCompanies();
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  // console.log(companies);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(`${res.data.message}`);
        navigate('/admin/jobs')
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message} `);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={submitHandler}>
        <div className=" max-w-md mx-auto grid grid-cols-2 gap-2 p-5 rounded-xl shadow-2xl h-[60vh] mt-[8vh]">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              value={input.description}
              name="description"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobtype}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              value={input.location}
              name="location"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>No. of postion</Label>
            <Input
              type="number"
              value={input.position}
              name="position"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Deadline</Label>
            <Input
              type="date"
              name="deadline"
              value={input.deadline}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="companies" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {companies.map((company) => (
                  <SelectItem value={company?.name?.toLowerCase()}>
                    {company?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <Button className=" bg-black text-white w-full mt-4 col-span-2">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className=" bg-black text-white w-full mt-4 col-span-2">
              Post New Job
            </Button>
          )}
          {companies.length == 0 ? (
            <p className="w-full col-span-2 text-red-700  ">
              * Please register a company first before posting a jobs
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </form>
    </div>
  );
}
