import { User } from "../Modules/Schema.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

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
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
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
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
