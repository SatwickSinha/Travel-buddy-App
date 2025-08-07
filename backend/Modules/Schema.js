import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId }, // Optional, since Mongo _id is enough
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

  // Optional fields for OAuth login
  password: { type: String },        
  googleId: { type: String },        
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

const languageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  language: { type: String, required: true }
});

export const Language = mongoose.model('Language', languageSchema);

const locationPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true }
});

export const LocationPreference = mongoose.model('LocationPreference', locationPreferenceSchema);

const natureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  natureType: { type: String, required: true }
});

export const Nature = mongoose.model('Nature', natureSchema);

const interestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interestType: { type: String, required: true }
});

export const Interest = mongoose.model('Interest', interestSchema);
