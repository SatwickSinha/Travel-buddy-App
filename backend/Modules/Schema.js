import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  profileRating: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  drinking: { type: Boolean },
  smoking: { type: Boolean },
  native: { type: String },
  phoneNo: { type: String },
  driving: { type: Boolean },
  pronouns: { type: String },
  religion: { type: String },
  bio: { type: String },
  language: { type: Array },
  locationPref: { type: Array },
  natureType: { type: Array },
  interestType: { type: Array },
  password: { type: String },        
  googleId: { type: String },        
  createdAt: { type: Date, default: Date.now }
});

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
export const User = mongoose.model('User', userSchema);


