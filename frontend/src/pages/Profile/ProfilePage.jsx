import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    drinking: false,
    smoking: false,
    native: "",
    phoneNo: "",
    driving: false,
    pronouns: "",
    religion: "",
    bio: "",
    language: [],
    locationPref: [],
    natureType: [],
    interestType: [],
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  // ✅ Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        })
        
        setFormData({
          ...formData,
          ...res.data,
          dob: res.data.dob ? res.data.dob.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/updateProfile", formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="profile-pic-wrapper">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="profile-pic"
          />
          <button className="remove-pic">×</button>
        </div>
        <button className="upload-btn">Upload Photo</button>

        <div className="password-section">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button className="change-pass-btn">Change Password</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="tabs">
          <span className="tab active">Profile Information</span>
          <span className="tab">Settings</span>
          <button className="add-user-btn">+ Add New User</button>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <h3>Basic Info</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pronouns"
            placeholder="Pronouns"
            value={formData.pronouns}
            onChange={handleChange}
          />

          <h3>Contact Info</h3>
          <input
            type="email"
            name="email"
            placeholder="Email (required)"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="native"
            placeholder="Native Place"
            value={formData.native}
            onChange={handleChange}
          />

          <h3>Preferences</h3>
          <label>
            <input
              type="checkbox"
              name="smoking"
              checked={formData.smoking}
              onChange={handleChange}
            />{" "}
            Smoking
          </label>
          <label>
            <input
              type="checkbox"
              name="drinking"
              checked={formData.drinking}
              onChange={handleChange}
            />{" "}
            Drinking
          </label>
          <label>
            <input
              type="checkbox"
              name="driving"
              checked={formData.driving}
              onChange={handleChange}
            />{" "}
            Driving
          </label>

          <h3>About You</h3>
          <textarea
            name="bio"
            placeholder="Write something about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />

          <button type="submit" className="save-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
