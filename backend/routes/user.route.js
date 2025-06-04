import express from "express";
import { register, login, updateProfile, logout, toggleBookmarks, getBookmarks } from "../controller/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js"
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/logout").get(logout);
router.route("/bookmark/:jobId").post(isAuthenticated,toggleBookmarks);
router.route("/my-bookmarks/:userId").get(isAuthenticated,getBookmarks);


 export default router;