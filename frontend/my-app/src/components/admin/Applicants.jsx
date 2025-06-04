import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../Redux/applicantSlice";

export default function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} =useSelector(store=>store.application)
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold text-xl max-w-7xl mx-auto my-8">
          Applicants:({applicants?.applications?.length})
        </h1>
        <ApplicantTable />
      </div>
    </div>
  );
}
