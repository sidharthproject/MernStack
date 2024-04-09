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
            return next(
                new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
              );
        }
        const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;
        
        if(!title || !description || !category || !country || !city || !location){
          
            return next(
                new ErrorHandler("Please provide full job detail ", 400)
              );
        }
        if((!salaryFrom && !salaryTo) && !fixedSalary){
            return next(
                new ErrorHandler("Please either provide fixed salary or ranged salary", 400)
              );
        }
        if(salaryFrom && salaryTo && fixedSalary){
            return next(
                new ErrorHandler("Canot enter fixed salary or ranged salary together", 400)
              );
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

export const getmyJobs = asyncHndler(async(req,res,next)=>{

    const {role} = req.user
        if(role === "JobSeeker"){
            return next(
                new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
              );
    }
    const myjobs = await Job.find({postedBy:req.user._id})

    
    res.status(200)
    .json({
        success:true,
        myjobs
    })
})

export const updatejob = asyncHndler(async(req,res,next)=>{
    const {role} = req.user
    if(role === "JobSeeker"){
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
          );
     }
     const {id} = req.params;
    //  console.log("req params"+id);
     let job  = await Job.findById(id)
     if(!job){
        return next(
            new ErrorHandler("Oops Jjob Not Found ", 400)
          );
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

export const deletejob = asyncHndler(async(req,res,next)=>{
    const {role} = req.user
    if(role === "JobSeeker"){
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
          );
     }

     const {id} = req.params;
     let job  = await Job.findById(id)
     if(!job){
        return next(
            new ErrorHandler("Oops job  not found", 400)
          );
     }
   await job.deleteOne()

    res.status(200)
     .json({     
        succss:true,
        message:"Job deleted successfully"
     })
})

export const getSinglejob = asyncHndler(async(req,res,next)=>{
    const  {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(
                new ErrorHandler("Job not found ", 400)
              );
        }
        res.status(200)
        .json({
            success:"true",
            job
        })
    } catch (error) {
        return next(
            new ErrorHandler("Invalid Id/Cast error.", 400)
          );
    }
})