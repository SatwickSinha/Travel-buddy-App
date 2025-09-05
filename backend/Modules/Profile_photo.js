import mongoose from "mongoose";

const profilePhotoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  photoUrl: {
    type: String,  // Cloudinary URL
    required: true,
  },
  photo: {
    data: Buffer,      // Actual file binary
    contentType: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProfilePhoto = mongoose.model("ProfilePhoto", profilePhotoSchema);
