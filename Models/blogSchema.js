import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String,
  author: String,
  Postdate: Date,
  blogImage: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
});

export const Blog = mongoose.model("Blog", blogSchema)
