import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroText from "./HeroText";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./Redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <>
      <div className="flex flex-col items-center gap-7 mt-[4vh] align-middle">
        <span className="text-[#ff0000]  text-md rounded-full mx-auto text-center  ">
          {<HeroText />}
        </span>
        <h1 className="text-5xl font-bold ">
          <span className="mx-12">Search, Apply &</span> <br /> Get Your
          <span className="text-[#1900ff] mr-5"> Dream Jobs</span>
        </h1>
        <p className="text-gray-500 w-[40%] ml-[4rem]">
          "Explore top job listings, apply instantly, and land your dream role
          today."
        </p>
        <div>
          <input
            type="text"
            aria-label="Search for jobs"
            placeholder={"Find Your Dream Jobs"}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-transparent hover:border-blue-500 focus:border-blue-500 outline-none h-[7vh] w-[30vw] rounded-l-full shadow-xl  px-3 py-3"
          />
          <Button
            onClick={changeHandler}
            className="rounded-r-full bg-blue-600 h-[7vh]"
          >
            <Search color="white"></Search>
          </Button>
        </div>
      </div>
    </>
  );
};
export default Herosection;
