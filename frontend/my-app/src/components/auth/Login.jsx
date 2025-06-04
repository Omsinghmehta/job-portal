import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../Redux/authSlice";
import axios from "axios";
import {toast} from "sonner"
import { Loader2 } from "lucide-react";
import { USER_API_ENDPOINT } from "../utils/constant";
const Login = () => {
   const [input, setuser] = useState({
      email: "",
      password: "",
      role: "",
    });
    const {loading,user} =useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const changeEventHandler = (e) => {
      setuser({ ...input, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));

      try {
  
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        if (res.status) {
          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something is missing ");
      }
      finally{
        dispatch(setLoading(false));
      }
    }
      useEffect(()=>{
        if(user)
        {
          navigate('/')
        }
      },[])
  return (
    <>
      <Navbar />
      <div>
        <form onSubmit={submitHandler}>
        <div className=" flex flex-col  border border-gray-200 m-auto gap-5 max-w-200 p-2">
             <h1 className="  flex font-bold text-xl mb-2">Login</h1>

            <div className=" flex flex-col gap-2  ">
              <label className="font-600">Email:</label>
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="example@gmail.com"
                className="border border-gray-200 pl-1 h-10"
              ></input>
            </div>

           
            <div className=" flex flex-col gap-2  ">
              <label className="font-600">Password:</label>
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="xyn123"
                onChange={changeEventHandler}
                className="border border-gray-200 pl-1 h-10"
              ></input>
            </div>
            <div className=" flex justify-between">
              <div className="gap-4 flex">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <label className="font-[600]"> Student</label>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <label className="font-[600]"> Recruiter</label>
              </div>
              </div>
              {
                loading?<Button className=" bg-black text-white w-full mt-4"><Loader2 className="animate-spin"/>Please wait</Button>: <Button className=" bg-black text-white w-full mt-4">Submit</Button>
              }
            <span>Don't have an account? <Link className=" text-blue-600 "to="/signup">Sign Up</Link></span>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
