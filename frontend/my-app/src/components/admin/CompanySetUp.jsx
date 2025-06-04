import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hook/useGetCompanyById";
// import { setSingleCompany } from "../Redux/companySlice";

export default function CompanySetUp() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const params = useParams();

  const id = params.id;
  useGetCompanyById(id);
 const {singleCompany} = useSelector(store=>store.company);

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFiletHandler = (e) => {
    setInput({ ...input, file: e.target?.files?.[0] });
  };
  const submitHandler = async (e) => {
    setloading(true);
    e.preventDefault();
    console.log(input);
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("location", input.location);
    formdata.append("website", input.website);
    formdata.append("description", input.description);
    if (input.file) formdata.append("file", input.file);
    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl my-[4rem] mx-auto ">
        <div className="flex gap-5">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            <ArrowLeft></ArrowLeft> Back
          </Button>
          <h1 className="text-xl font-bold">Company Setup</h1>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="w-[40vw] mx-auto  flex flex-wrap gap-3">
          <div>
            <Label className="text-md mb-2">Company Name</Label>
            <Input
              name="name"
              type="text"
              className="w-[18rem]"
              value={input.name}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div>
            <Label className="text-md mb-2">Description</Label>
            <Input
              name="description"
              type="text"
              value={input.description}
              className="w-[18rem]"
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div>
            <Label className="text-md mb-2">Website</Label>
            <Input
              name="website"
              type="text"
              value={input.website}
              className="w-[18rem]"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label className="text-md mb-2">Location</Label>
            <Input
              name="location"
              type="text"
              value={input.location}
              onChange={changeEventHandler}
              className="w-[18rem]"
            ></Input>
          </div>
          <div>
            <Label className="text-md mb-2">Logo</Label>
            <Input
              name="file"
              type="file"
              accept="image/*"
              className="w-[18rem]"
              onChange={changeFiletHandler}
            ></Input>
          </div>

          {loading ? (
            <Button className=" bg-black text-white w-full mt-4">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className=" bg-black text-white w-full mt-4">Update</Button>
          )}
        </div>
      </form>
    </div>
  );
}
