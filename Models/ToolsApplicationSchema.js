import mongoose from "mongoose";

const ToolsApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const ToolsApplications = mongoose.model(
  "ToolApplication",
  ToolsApplicationSchema
);
