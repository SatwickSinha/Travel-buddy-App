import uploadOnCloudinary from "../utils/cloudinary.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const localFilePath = req.file.path;

    const result = await uploadOnCloudinary(localFilePath);

    if (result) {
      return res.status(200).json({
        message: "File uploaded successfully",
        localPath: `/public/temp/${req.file.filename}`,
        cloudinaryUrl: result.secure_url,               
        data: result,
      });
    } else {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default uploadFile;
