import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/erros.js";
import { Blog } from "../Models/blogSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewBlog = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Blog Image Required", 400));
  }

  const { blogImage } = req.files;
  const { title, description, tag, author, Postdate } = req.body;

  if (!title || !description || !tag || !author || !Postdate) {
    return next(new ErrorHandler("Please fill All Fields", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    blogImage.tempFilePath,
    { folder: "PORTFOLIO_BLOG_IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed to upload blogImage to Cloudinary", 500)
    );
  }

  const blog = await Blog.create({
    title,
    description,
    tag,
    author,
    Postdate,
    blogImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Blog added successfully",
    blog,
  });
});

export const getAllBlog = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find({});
    res.status(200).json({
      success: true,
      blogs,
    });
  
});

export const getSingleBlog = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    res.status(200).json({
      success: true,
      blog,
    });

});


export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const newBlogData = {
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    author: req.body.author,
    Postdate: req.body.Postdate,
  };

  if (req.files && req.files.blogImage) {
    const blogImage = req.files.blogImage;
    const blog = await Blog.findById(req.params.id);
    const blogImageId = blog.blogImage.public_id;
    await cloudinary.uploader.destroy(blogImageId);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      { folder: "PORTFOLIO_BLOG_IMAGES" }
    );
    newBlogData.blogImage = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, newBlogData,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog,
  });


});



export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);

    if(!blog){
        return next(new ErrorHandler("Blog not found", 404));
    }
    const blogImageId = blog.blogImage.public_id;
    await cloudinary.uploader.destroy(blogImageId);
    await blog.deleteOne();
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    });
});
