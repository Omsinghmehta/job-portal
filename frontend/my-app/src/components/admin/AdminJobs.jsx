import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hook/useGetAllAdminJobs";
import { setSearchJobByText } from "../Redux/jobSlice";
export default function AdminJobs() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-6xl mx-auto my-10 flex justify-between">
          <Input
            type="text"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
          />
          <Button
            className="bg-black text-white cursor-pointer"
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}
