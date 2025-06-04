import {  JOB_API_ENDPOINT } from '@/components/utils/constant';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllAdminJob } from '@/components/Redux/jobSlice';

export default function useGetAllAdminJobs() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setAllAdminJob(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [])
}