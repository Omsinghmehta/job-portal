import mongoose from "mongoose";
// import { Job } from "./job.model.js";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Job'
    }],
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        photo: {
            type: String,
            default: ""
        }
    }

}, { timestamps: true });
export const User = mongoose.model('User', userSchema);