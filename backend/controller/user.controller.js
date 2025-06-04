import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with email",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedpassword,
      phoneNumber,
      role,
      profile: {
        photo: cloudResponse.secure_url
      }
    })
    return (
      res.status(200).json({
        message: "account created successfully",
        success: true
      })
    )
  } catch (error) {
    console.log(error)
  }
};
export const login = async (req, res) => {
  try {
    const {  email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    const ispass = await bcrypt.compare(password, user.password);
    if (!ispass) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
    user = {
      _id: user._id,
      profile: user.profile,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    }
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true }).json({
      message: `welcome back ${user.fullname}`,
      user,
      success: true
    })
  }
  catch (e) {
    console.log(e);
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUri = getDataUri(file);
    if (!fileUri) {
      return res.status(400).json({ message: "No file uploaded or invalid file." });
    }
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      format: 'pdf'
    });

    let skillsArray;
    if (skills)
      skillsArray = skills.split(',');

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user does not found ",
        success: false,
      });
    }

    if (fullname)
      user.fullname = fullname;
    if (phoneNumber)
      user.phoneNumber = phoneNumber;
    if (email)
      user.email = email;
    if (bio)
      user.profile.bio = bio;
    if (skills)
      user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname
    }
    await user.save();
    user = {
      _id: user._id,
      profile: user.profile,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    }

    return res.status(200).json({
      message: "profile updated succesfully",
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}


export const toggleBookmarks=async(req,res)=>{
 const userId=req.id;
 const jobId=req.params.jobId;
 const user=await User.findById(userId);
 const index=user.bookmarks.indexOf(jobId);
 if(index===-1)
 {
  user.bookmarks.push(jobId)
 }
 else{
  user.bookmarks.splice(index,1);
 }

 await user.save();
 res.json({success:true,bookmarks:user.bookmarks});

} 
export const getBookmarks=async(req,res)=>{
  const userId=req.params.userId;
  const user=await User.findById(userId);
 
  res.json({bookmarks:user.bookmarks});
}
