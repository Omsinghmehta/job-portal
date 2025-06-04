import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import React, { useState } from "react";
import { DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/constant";
import { setUser } from "./Redux/authSlice";

export default function UpdateProfileDialog({ open, setopen }) {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setinput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skills) => skills),
    file: user?.profile?.resume,
  });
 const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    setinput({ ...input, file: e.target?.files?.[0]});
  };
  const submitHandler = async(e) => {
    setloading(true);
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("skills", input.skills);
    formData.append("bio", input.bio);
    formData.append("phoneNumber", input.phoneNumber);
    
    if(input.file)
    formData.append("file", input.file);
    try {
        const res=await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            },
            withCredentials:true
        })

        if(res.data.success)
        {
            dispatch(setUser(res.data.user)); 
            toast.success(res.data.message);
        }
        
    } catch (error) {
        console.log(error);
        toast.success(error.res.data.message);
    }
    finally{
        setopen(false);
        setloading(false);
    }
    
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="bg-white rounded-2xl shadow-2xl z-50 md:w-[50vw] ">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="fullname" className=" text-right ml-12">
              Name:
            </Label>
            <Input
              id="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className=" col-span-3 rounded-2xl"
              name="fullname"
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="email" className=" text-right ml-12">
              Email:
            </Label>
            <Input
              id="email"
              value={input.email}
              onChange={changeEventHandler}
              className=" col-span-3 rounded-2xl"
              name="email"
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="phoneNumber" className=" text-right ml-11">
              Number:
            </Label>
            <Input
              id="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className=" col-span-3 rounded-2xl"
              name="phoneNumber"
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="Bio" className=" text-right ml-12">
              Bio:
            </Label>
            <Input
              id="Bio"
              value={input.bio}
              onChange={changeEventHandler}
              className=" col-span-3 rounded-2xl"
              name="bio"
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="skills" className=" text-right ml-12">
              Skills:
            </Label>
            <Input
              id="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className=" col-span-3 rounded-2xl"
              name="skills"
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="file" className=" text-right ml-12">
              File:
            </Label>
            <Input
              id="file"
              onChange={fileChangeHandler}
              className=" col-span-3 rounded-2xl"
              type="file"
              name="file"
              accept="application/pdf"
            ></Input>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className=" bg-black text-white w-full mt-4">
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className=" bg-black text-white w-full mt-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
