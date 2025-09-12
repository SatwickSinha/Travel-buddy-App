import { User } from "../Modules/Schema.js";
import bcrypt from "bcrypt";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -googleId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      dob,
      gender,
      drinking,
      smoking,
      native,
      phoneNo,
      driving,
      religion,
      bio,
      language,
      locationPref,
      natureType,
      interestType,
      password
    } = req.body;

    const updateData = {
      name,
      dob,
      gender,
      drinking,
      smoking,
      native,
      phoneNo,
      driving,
      religion: religion || "",
      bio: bio || "",
      language,
      locationPref,
      natureType,
      interestType,
    };

    // Only update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password -googleId");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

