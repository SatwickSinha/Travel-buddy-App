import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


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
  googleId: { type: String }
}, { timeseries: true });

userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id : this._id,
    name : this.name,
    email : this.email
  } , process.env.SECRET_KEY , {expiresIn : '1d'});
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    _id : this._id,
  },process.env.REFRESH_SECRET_KEY , {expiresIn : '7d'});
}

export const User = mongoose.model('User', userSchema);


