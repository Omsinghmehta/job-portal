import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import useGetCompanyById from "@/hook/useGetCompanyById";

export default function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

console.log(res)
      console.log(res?.data?.company?._id)
      if (res?.data?.success) {
        toast.success("Company Created Successfully");

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 ">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name, You can change this
            later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Google, Microsoft etc"
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-3xl my-3"
        ></Input>
        <div className="space-x-4 my-5">
          <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button className="text-white bg-black "  onClick={registerNewCompany} disabled={!companyName.trim() }>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
