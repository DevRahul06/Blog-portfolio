import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ToolsApplications } from "../Models/ToolsApplicationSchema.js";
import ErrorHandler from "../middlewares/erros.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Svg Required", 400)
    );
  }
  const { svg } = req.files;
  const { name } = req.body;

  if (!name) {
    return next(
      new ErrorHandler("Please provide a name for the application", 400)
    );
  }

  //POSTING AVATAR
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "APPLICATION_SVG" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  const ToolApplication = await ToolsApplications.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message:"new Tools was uploaded successfully",
    ToolApplication
  })

});


export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const ToolApplication = await ToolsApplications.findById(id);

    if(!ToolApplication){
        return next(new ErrorHandler("Application not found", 404));
    }
    const ToolApplicationSvgId = ToolApplication.svg.public_id;
    await cloudinary.uploader.destroy(ToolApplicationSvgId);
    await ToolApplication.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application deleted successfully",
    });

});


export const getAllApplication = catchAsyncErrors(async (req, res, next) => {
    const toolapplication = await ToolsApplications.find();
    res.status(200).json({
        success: true,
        toolapplication
    })
});
