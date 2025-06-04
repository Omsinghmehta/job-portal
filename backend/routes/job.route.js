import express from "express";
import {postJob,getAllJobs,getAdminJob,getJobById  } from "../controller/job.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/getAdminJobs").get(isAuthenticated,getAdminJob);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/get").get(isAuthenticated,getAllJobs);

 export default router;