import Navbar from "./shared/Navbar";
import Herosection from "./Herosection.jsx"
import  CategoryCrousal  from "./CategoryCrousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hook/useGetAllJobs";
const Home=()=>{
  useGetAllJobs();
  return <>
  <Navbar/>
  <Herosection/>
  <CategoryCrousal/>
  <LatestJob/>
  <Footer/>
  </>
}

export default Home;