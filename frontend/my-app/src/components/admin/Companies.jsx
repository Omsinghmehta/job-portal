import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "../Redux/companySlice";
export default function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-6xl mx-auto my-10 flex justify-between">
          <Input type="text" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}className="w-fit" />
          <Button
            className="bg-black text-white cursor-pointer"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
}
