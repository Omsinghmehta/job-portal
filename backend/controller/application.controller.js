import { Job } from "../models/job.model.js"
import { Application } from "../models/application.model.js";
import sendMail from "../utils/sendMail.js"
import { User } from "../models/user.model.js";
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'created_by'
        });
        console.log(job)
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        const candidate = await User.findById(userId);
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication.id);
        await job.save();
        console.log("applied email",job?.created_by?.email)
        await sendMail(
            job.created_by.email,
            `New Appliaction for ${job?.title}`,
            `<p> Hello ${job?.created_by?.fullname},</p>
            <p>${candidate?.fullname} has applied to your job <b>${job?.title}</b></p>
            <p> Check your dashboard for more details.</p>`
        );

        return res.status(200).json({
            message: "job applied successfully",
            success: true
        })
    }
    catch (e) {
        console.log(e);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobs = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });

        if (!jobs) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        const application = await Application.findOne({ _id: applicationId }).populate({
            path:'applicant'
        }).populate({
            path:'job'
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        application.status = status.toLowerCase();
        await application.save();
        await sendMail(
            application?.applicant?.email,
            `Application Status for ${application?.job?.title}`,
            `<p>Hello ${application?.applicant?.fullname},</p> 
            <p>Your application for ${application?.job?.title} has been updated to :<b>${application?.status}</b></p>
            <p>Check your dashboard for more details.</p>`
        )

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}