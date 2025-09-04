import mongoose from "mongoose";

const profilePhotoSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    photoUrl : {
        type : String,
        required : true
    }
})
export const ProfilePhoto = mongoose.model("ProfilePhoto", profilePhotoSchema);