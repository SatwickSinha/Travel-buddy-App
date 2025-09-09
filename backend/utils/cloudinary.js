import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) throw new Error("File path is required");

  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });

    // Want to keep file locally (so don’t delete until working tested)
    return response;
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    return null;
  }
};

export default uploadOnCloudinary;
