import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany=async (req,res)=>{
    try {   
         const {companyName}=req.body;
         if(!companyName)
         {
            return res.status(400).json({
                message:"company name is required",
                success:false
            })
         }
         let company=await Company.findOne({name:companyName});
         if(company)
         {
            
            return res.status(400).json({
                message:"you cant't register same company",
                success:false
            })
         }
         company=await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({
            message:"company register succesfully",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }

}
export const getCompany=async(req,res)=>{
    try{
    const  userId =req.id;
    const companies=await Company.find({userId});
    if(!companies.length)
    {
        return res.status(404).json({
            message:"company not found",
            success:false
        })
    }

    return res.status(200).json({
        message:"company founded",
        companies,
        success:true
    })
} catch(e){
 console.log(e);
}
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company found",
            company, // ✅ correct key here
            success: true
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const updateCompany=async(req,res)=>{
try {
        const {name,description,location,website}=req.body;
        const file=req.file;
        const fileuri=getDataUri(file);
        const cloudresponse=await cloudinary.uploader.upload(fileuri.content);
        const logo=cloudresponse.secure_url
        const updateData={name,description,location,website,logo};

        const company=await Company.findByIdAndUpdate(req.params.id,updateData);


        if(!company)
        {
            return res.status(201).json({
                message:"company not founded",
                success:false
            })
        }
        return res.status(201).json({
            message:"company info updated successfully",
            success:true
        })
    
} catch (error) {
    console.log(error)
}}