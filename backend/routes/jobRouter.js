import express from 'express'
import { deletejob, getAllJobs, getSinglejob, postJob } from '../controller/jobController.js'
import { isAuthorized } from '../middlewares/authentication.js'
import { getmyJobs } from '../controller/jobController.js'
import { updatejob } from '../controller/jobController.js'

const router = express.Router()
  router.get("/getAll",getAllJobs)
  router.post("/postJob",isAuthorized,postJob)
  router.get("/getmyJob",isAuthorized,getmyJobs)
  router.put("/update/:id",isAuthorized,updatejob)
  router.delete("/delete/:id",isAuthorized,deletejob)
  router.get("/:id",isAuthorized , getSinglejob);
export default router