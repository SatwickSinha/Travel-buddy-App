import fs from "fs";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ProfilePhoto } from "../Modules/Profile_photo.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    // Read file as buffer
    const fileData = fs.readFileSync(req.file.path);

    // Saving both URL + binary in MongoDB
    const profilePhoto = await ProfilePhoto.create({
      userId: req.user.id,
      photoUrl: result.secure_url,
      photo: {
        data: fileData,
        contentType: req.file.mimetype,
      },
    });

    return res.status(200).json({
      message: "Profile photo uploaded successfully",
      cloudinaryUrl: result.secure_url,
      photoId: profilePhoto._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getPhoto = async (req, res) => {
//   try {
//     const photo = await ProfilePhoto.findById(req.params.id);

//     if (!photo) {
//       return res.status(404).json({ message: "Photo not found" });
//     }

//     res.set("Content-Type", photo.photo.contentType);
//     res.send(photo.photo.data);
//   } catch (err) {
//     res.status(500).json({ message: "Could not fetch photo" });
//   }
// };

export default uploadFile ;
