import { asyncHndler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/Error.js";
import {Job} from "../models/job.model.js"

export const getAllJobs = asyncHndler(async(req,res,next)=>{
    const jobs  = await Job.find({expired:false});
    if(!jobs){
        throw new ErrorHandler("Jobs are not found",400)
    }

    res.status(200)
       .json({
        sucess:true,
        jobs
       });
    });

    export const postJob = asyncHndler(async(req,res,next)=>{
        const {role} = req.user
        if(role === "JobSeeker"){
            throw new ErrorHandler("Job Seeker canot allowed to access thi resoureces !")
        }
        const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;
        
        if(!title || !description || !category || !country || !city || !location){
          
            throw new ErrorHandler("Please Provide full job detail")
        }
        if((!salaryFrom && !salaryTo) && !fixedSalary){
            throw new ErrorHandler("Please either provide fixedsalary or ranged salary")
        }
        if(salaryFrom && salaryTo && fixedSalary){
            throw new ErrorHandler("Cannot enter fixed salary and ranged salary together !")
    }

    const postedBy =  req.user._id;
    // console.log("user,_id"+postedBy);
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })
  res.status(200)
  .json({
    sucess:true,
    message:"Job posted successfully",
    job,
  })
    })

export const getmyJobs = asyncHndler(async(req,res)=>{

    const {role} = req.user
        if(role === "JobSeeker"){
            throw new ErrorHandler("Job Seeker canot allowed to access this resoureces !")
    }
    const myjobs = await Job.find({postedBy:req.user._id})

    
    res.status(200)
    .json({
        success:true,
        myjobs
    })
})

export const updatejob = asyncHndler(async(req,res)=>{
    const {role} = req.user
    if(role === "JobSeeker"){
        throw new ErrorHandler("Job Seeker canot allowed to access thi resoureces !")
     }
     const {id} = req.params;
    //  console.log("req params"+id);
     let job  = await Job.findById(id)
     if(!job){
        throw new ErrorHandler("Oops Job not Found!",404)
     }
     const updateJob = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
     })
      res.status(200)
         .json({
            success:true,
            updateJob,
            message:"Job update Successfully"
         })

    })

export const deletejob = asyncHndler(async(req,res)=>{
    const {role} = req.user
    if(role === "JobSeeker"){
        throw new ErrorHandler("Job Seeker canot allowed to access this resoureces !")
     }

     const {id} = req.params;
     let job  = await Job.findById(id)
     if(!job){
        throw new ErrorHandler("Oops Job not Found!",404)
     }
   await job.deleteOne()

    res.status(200)
     .json({     
        succss:true,
        message:"Job deleted successfully"
     })
})

export const getSinglejob = asyncHndler(async(req,res)=>{
    const  {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            throw new ErrorHandler("Job nbot found", 404)
        }
        res.status(200)
        .json({
            success:"true",
            job
        })
    } catch (error) {
         throw new ErrorHandler("Invalid Id/Cast error" ,400)
    }
})