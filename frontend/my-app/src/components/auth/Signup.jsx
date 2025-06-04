import React, { useState ,useEffect} from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/authSlice";
const Signup = () => {
  const [input, setuser] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const {loading,user}=useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setuser({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setuser({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) 
    formData.append("file", input.file);

    try {

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.status) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  };
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
            <h1 className="  flex font-bold text-xl mb-2">Sign Up</h1>
            <div className=" flex flex-col gap-1  ">
              <label className="font-600">Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Rohan rawat"
                className="border border-gray-200 pl-1 h-10"
              ></input>
            </div>

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
              <label className="font-600">Phone Number:</label>
              <input
                type="tel"
                 pattern="[0-9]{10}" 
                 maxlength="10"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="56783456321"
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
              <div className="gap-9 flex">
                <label className="font-[600] ">Profile:</label>
                <input
                  accept="image/*"
                  type="file"
                  name="file"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
            {
                loading?<Button className=" bg-black text-white w-full mt-4"><Loader2 className="animate-spin"/>Please wait</Button>: <Button className=" bg-black text-white w-full mt-4">Submit</Button>
              }            <span>
              Already have an account?{" "}
              <Link className=" text-blue-600 " to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
export default Signup;
