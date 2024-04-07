import express from 'express'
import { JobSeekerDeleteApplication,employeeGetApplication,jobSeekerGetApplication, postApplication } from '../controller/applicationController.js'
import { isAuthorized } from '../middlewares/authentication.js';
const router = express.Router()
router.post("/post",isAuthorized,postApplication)
router.get("/jobseeker/getall",isAuthorized,jobSeekerGetApplication);
router.get("/employer/getall",isAuthorized,employeeGetApplication);
router.delete("/delete/:id",isAuthorized,JobSeekerDeleteApplication);
export default router