import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import {Button} from "../ui/button.jsx";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { setUser } from "../Redux/authSlice.js";
import { toast } from "sonner";
const Navbar = () => {
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const LogoutHandler=async()=>{
      try {
        const res=await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials:true});
        if(res.data.success)
        {
          dispatch(setUser(null));
          navigate('/');
          toast.success(res?.data?.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error?.res?.data?.message|| "Error occured");
      }
    }

  return (
    <>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="text-2xl font-bold">
          <h1>
            Talent<span className="text-[#1900ff]">Bridge</span>
          </h1>
        </div>
        <div className=" flex items-center gap-12">

          {
            user && user.role=='recruiter'?(
          <ul className="flex font-medium gap-5">
            <li> <Link to="/admin/companies" className="hover:underline">Companies</Link></li>
            <li><Link to="/admin/jobs"className="hover:underline">Jobs</Link></li>
          </ul>):
             <ul className="flex font-medium gap-5">
            <li> <Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/jobs"className="hover:underline">Jobs</Link></li>
            <li><Link to="/browse"className="hover:underline">Browse</Link></li>
            {
              user && <li><Link to="/bookmarks"className="hover:underline">Bookmarks</Link></li>

            }

          </ul>
          }
       
           {
             !user?(
                    <div className="flex items-center gap-2"> 
                    <Link to="/login"><Button variant="outline">login</Button></Link>
                    <Link to ="/signup"><Button className="bg-[#5a168b] text-white hover:bg-[#665081] ">Signup</Button></Link>
                    </div>
              )
             :
             (
                <Popover >
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.photo  || "https://th.bing.com/th?q=User+Placeholder+Dummy&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"}
                      className="h-8 w-8 rounded-full object-cover"
                    ></AvatarImage>
                    
                    
                  </Avatar>
                </PopoverTrigger>
                
                <PopoverContent className="max-w-100 my-5 bg-gray-200 rounded-xl mx-3 p-2 w-75 z-10">
                  <div className="flex gap-4  ">
                    <Avatar className="cursor-pointer  flex-shrink-0">
                      <AvatarImage
              
                        src={user?.profile?.photo||"https://th.bing.com/th?q=User+Placeholder+Dummy&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"}
                        className="h-8 w-8 rounded-full object-cover "
                     
                      ></AvatarImage>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-medium">{user?.fullname} </h4>
                      <p className="text-sm  break-words">
                       {user.profile.bio}
                      </p>
                    </div>
                  </div>
    
                  <div className="flex-col my-2 ">
                        {
                          user && user.role=='student'?   (          
                      <div className="flex gap-2 items-center"><User2/><Button  variant="link"> <Link to="/profile">View Profile</Link></Button></div>
                          ):<></>
                        }
                       
                        <div className="flex gap-2 items-center " onClick={LogoutHandler}> <LogOut/><Button  variant="link">Logout</Button></div>
                    </div>
                </PopoverContent>
              </Popover>
             )
           }
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
