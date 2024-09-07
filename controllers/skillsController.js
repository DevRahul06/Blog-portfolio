import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Skills } from "../Models/skillsSchema.js";
import ErrorHandler from "../middlewares/erros.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skills Icon/Svg Required", 400));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return next(new ErrorHandler("Please fill All From", 400));
  }

  //POSTING AVATAR
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO_SKILL_SVG" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  const skills = await Skills.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Skill Added Successfully",
    skills,
  });
});
export const getAllSkill = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skills.find();
  res.status(200).json({
    success: true,
    skills,
  });
});


export const deleteNewSkill = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
    const skills = await Skills.findById(id);

    if(!skills){
        return next(new ErrorHandler("skill not found", 404));
    }
    const ToolApplicationSvgId = skills.svg.public_id;
    await cloudinary.uploader.destroy(ToolApplicationSvgId);
    await Skills.deleteOne();

    res.status(200).json({
        success: true,
        message: "Skill deleted successfully",
    });

});


export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
    let skills = await Skills.findById(id);

    if(!skills){
        return next(new ErrorHandler("skill not found", 404));
    }

    const {proficiency} = req.body;
    skills = await Skills.findByIdAndUpdate(id, {proficiency},{
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      message: "Skill Update successfully",
      skills,
    })

});
