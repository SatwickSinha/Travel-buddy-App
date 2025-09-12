import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    profileRating: 0,
    email: "",
    drinking: false,
    smoking: false,
    native: "",
    phoneNo: "",
    driving: false,
    pronouns: "",
    religion: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserData = async ()=> {
      try{
        const response = await axios.get("http://localhost:3000/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
          }
        );
        setFormData({
          ...formData,
          ...response.data,
          dob: response.data.dob ? response.data.dob.split("T")[0] : "",
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const response = await axios.put("http://localhost:3000/updateProfile", { ...formData }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      });
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

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
          <input type="password" placeholder="Old Password" />
          <input type="password" placeholder="New Password" />
          <button className="change-pass-btn">Change Password</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="tabs">
          <div>
            <span className="tab active">Profile</span>
            <span className="tab">Settings</span>
          </div>
          <button className="add-user-btn"
            onClick={async () => {
              if (editMode) {
                await updateProfile();  
              }
              setEditMode(!editMode);  
            }}
          > {editMode ? "Save" : "Edit"} 
          </button>

          {editMode && <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>}
        </div>

        <form className="profile-form">
          <h3>Basic Details</h3>

          {/* Full Name */}
          <div className="form-row">
            <label className="form-label">Full Name : </label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.name}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-row">
            <label className="form-label">Date of Birth :</label>
            {editMode ? (
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.dob}</span>
            )}
          </div>

          {/* Gender */}
          <div className="form-row">
            <label className="form-label">Gender :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.gender}</span>
            )}
          </div>

          {/* Profile Rating */}
          <div className="form-row">
            <label className="form-label">Profile Rating :</label>
            <span className="form-value">{formData.profileRating}</span>
          </div>

          {/* Email */}
          <div className="form-row">
            <label className="form-label">Email :</label>
            <span className="form-value">{formData.email}</span>
          </div>

          <h3>Preferences</h3>

          {/* Drinking */}
          <div className="form-row">
            <label className="form-label">Drinking :</label>
            {editMode ? (
              <button
                type="button"
                className={`toggle-btn ${formData.drinking ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, drinking: !formData.drinking })}
              >
                {formData.drinking ? "Yes" : "No"}
              </button>
            ) : (
              <span className="form-value">{formData.drinking ? "Yes" : "No"}</span>
            )}
          </div>

          {/* Smoking */}
          <div className="form-row">
            <label className="form-label">Smoking :</label>
            {editMode ? (
              <button
                type="button"
                className={`toggle-btn ${formData.smoking ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, smoking: !formData.smoking })}
              >
                {formData.smoking ? "Yes" : "No"}
              </button>
            ) : (
              <span className="form-value">{formData.smoking ? "Yes" : "No"}</span>
            )}
          </div>

          {/* Driving */}
          <div className="form-row">
            <label className="form-label">Driving :</label>
            {editMode ? (
              <button
                type="button"
                className={`toggle-btn ${formData.driving ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, driving: !formData.driving })}
              >
                {formData.driving ? "Yes" : "No"}
              </button>
            ) : (
              <span className="form-value">{formData.driving ? "Yes" : "No"}</span>
            )}
          </div>


          {/* Native */}
          <div className="form-row">
            <label className="form-label">Native :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.native}
                onChange={(e) => setFormData({ ...formData, native: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.native}</span>
            )}
          </div>

          {/* Phone No */}
          <div className="form-row">
            <label className="form-label">Phone No : </label>
            {editMode ? (
              <input
                type="text"
                value={formData.phoneNo}
                onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.phoneNo}</span>
            )}
          </div>

          {/* Pronouns */}
          <div className="form-row">
            <label className="form-label">Pronouns :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.pronouns}
                onChange={(e) =>
                  setFormData({ ...formData, pronouns: e.target.value })
                }
              />
            ) : (
              <span className="form-value">{formData.pronouns}</span>
            )}
          </div>

          {/* Religion */}
          <div className="form-row">
            <label className="form-label">Religion :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.religion}
                onChange={(e) =>
                  setFormData({ ...formData, religion: e.target.value })
                }
              />
            ) : (
              <span className="form-value">{formData.religion}</span>
            )}
          </div>

          <h3>About</h3>
          <div className="form-row">
            <label className="form-label">Bio :</label>
            {editMode ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            ) : (
              <span className="form-value">{formData.bio}</span>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfilePage;
