import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '@/components/utils/constant';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/components/Redux/companySlice';

export default function useGetAllCompanies() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                   
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompany();
    }, [])
}
