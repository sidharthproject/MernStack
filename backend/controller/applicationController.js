import { asyncHndler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/Error.js";
import { Application } from "../models/application.model.js";
import cloudinary from "cloudinary"
import { Job } from "../models/job.model.js";
export const employeeGetApplication =  asyncHndler(async(req,res,next)=>{
    const {role} = req.user
    if(role === "JobSeeker"){
      return next(
         new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
       );
     }

     const {_id} = req.user;
     const application = await Application.find({"employerId.user":_id})

     res.status(200).json({
        sucess:true,
        application
     })
})

export const jobSeekerGetApplication =  asyncHndler(async(req,res,next)=>{
    const {role} = req.user
    if(role === "Employer"){
      return next(
         new ErrorHandler("Employer not allowed to access this resource.", 400)
       );
     }

     const {_id} = req.user;
     const application = await Application.find({"applicantId.user":_id})

     res.status(200).json({
        sucess:true,
        application
     })
})

export const JobSeekerDeleteApplication = asyncHndler(async(req,res,next)=>{
    const {role} = req.user
    if(role === "Employer"){
      return next(
         new ErrorHandler("Employer not allowed to access this resource.", 400)
       );
     }

     const {id} = req.params
     const application = await Application.findById(id)
     if(!application){
      return next(
         new ErrorHandler("Oops application not found", 400)
       );
     }
     await application.deleteOne()

     res.status(200)
     .json({
        success:true,
        message:"Application Deleted Successfully"
     })
})

// export const postApplication = asyncHndler(async(req,res,next)=>{
// cloudinary.v2.config(
//     {
//         cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key:process.env.CLOUDINARY_API_KEY, 
//         api_secret:process.env.CLOUDINARY_API_SECRET
//     }
// )

//     const {role} = req.user
//     if(role === "Employer"){
//       return next(
//          new ErrorHandler("Employer not allowed to access this resource.", 400)
//        );
//      }
//      if(!req.files || Object.keys(req.files).length === 0)  {
//       return next(
//          new ErrorHandler("Resumem is required", 400)
//        );
//      } 

//      const {resume} = req.files;
//      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

//      // Check if the uploaded file is not in the allowed formats
//      if (!allowedFormats.includes(resume.mimetype)) {
//       return next(
//          new ErrorHandler("Please  upload image in jpg ,png format", 400)
//        );
//      }
//      const cloudinaryResponse =await cloudinary.uploader.upload(resume.tempFilePath);
 
//      if(!cloudinaryResponse || cloudinaryResponse.error ){
//     console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown cloudinary error")

//     return next(
//       new ErrorHandler("Failed upload resume", 400)
//     );
//      }

//      const{name,email,coverLetter,phone,address,jobId} = req.body

//      const applicantId = {
//          user:req.user._id,
//          role:"JobSeeker"
//      }

//      if(!jobId){
//       return next(
//          new ErrorHandler("Job not found", 400)
//        );
//      }

//      const jobDetails = await Job.findById(jobId)
//      if(!jobDetails){
//       return next(
//          new ErrorHandler("Job not found", 400)
//        );
//      }

//      const employerId = {
//         user:jobDetails.postedBy,
//         role:"Employer"
//      }

//      if(!name|| !email || !coverLetter || !phone || !address|| !applicantId || !employerId || !resume){
//       return next(
//          new ErrorHandler("Please fill all the field ", 400)
//        );
//      }

//      const application = await Application.create({
//         name,
//         email,
//         coverLetter,
//         phone,
//         address,
//         applicantId,
//         employerId,
//         resume:{
//             public_id:cloudinaryResponse.public_id,
//             url:cloudinaryResponse.secure_url
//         }
//      })
//  res.status(200)
//     .json({
//         success:true,
//         message:"Application submitted successfully",
//         application
//     })
// });

export const postApplication = asyncHndler(async (req, res, next) => {

  cloudinary.v2.config(
    {
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
    } 
)
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }else if(role === "JObSeeker"){
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    ); 
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
 
const applicantId = {
  user:req.user._id,
  role:"JobSeeker"
}
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

      const employerId = {
      user:jobDetails.postedBy,
      role:"Employer"
}
const applied = await Application.findOne({ $and: [{ applicantId }, { employerId }] })
if (applied) {
    return  next(new ErrorHandler("Already Applied" ,400))
}
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantId ||
    !employerId ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantId,
    employerId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
}});
