import e from "express";
import { User } from "../Modules/Schema.js";
import bcrypt from "bcrypt";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password, -googleId");

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
    const userId = req.user.id;
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

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
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
        ...(hashedPassword && { password: hashedPassword })
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};
