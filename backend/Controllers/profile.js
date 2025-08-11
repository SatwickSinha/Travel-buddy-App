import { User } from '../Modules/Schema.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      dob,
      profileRating,
      gender,
      drinking,
      smoking,
      native,
      phoneNo,
      driving,
      pronouns,
      religion,
      bio,
      language,
      location,
      natureType,
      interestType
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        dob,
        profileRating,
        gender,
        drinking,
        smoking,
        native,
        phoneNo,
        driving,
        pronouns,
        religion,
        bio,
        language,
        location,
        natureType,
        interestType
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};