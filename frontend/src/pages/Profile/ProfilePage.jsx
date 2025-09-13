import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css"; // <-- import as default
import { BASE } from "../../../api";
import { toast } from "react-toastify";
import { useUser } from "../../GlobalUserContext";
import { Edit2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
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
    const fetchUserData = async () => {
      try {
        const res = await fetch(BASE + "/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "*",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else if (res.status === 403) {
          toast.error("Token Invalid Login Again");
          setTimeout(() => {
            sessionStorage.removeItem("userToken");
            dispatch({ type: "CLEAR_USER" });
            navigate("/", { replace: true });
          }, 2000);
        } else {
          toast.error("Someting went wrong");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  const updateProfile = async () => {
    try {
      const response = await fetch(BASE + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "*",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(formData),
      });
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className={styles.profileContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.profilePicWrapper}>
          <img
            src="https://res.cloudinary.com/dgbtuxnex/image/upload/v1757017132/dmsknlgc5zt1knqfwkl6.jpg"
            alt="profile"
            className={styles.profilePic}
          />
          <button className={styles.removePic}>×</button>
        </div>
        <button className={styles.uploadBtn}>Upload Photo</button>
        
      </div>
      {/* Right Section */}
      <div className={styles.rightSection}>
        <form className={styles.profileForm}>
          <div className={styles.tabs}>
            <h3>Basic Details</h3>
            <div>
              {editMode
                ? <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className={styles.addUserBtn}>
                    <Save size={15} />
                    Save
                  </div>
                  <button className={`${styles.addUserBtn} ${styles.cancelBtn}`} onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
                : <button className={styles.addUserBtn} onClick={() => setEditMode(true)}><Edit2 size={17} /> Edit</button>
              }
            </div>
          </div>
          {/* Full Name */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Full Name : </label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.name}</span>
            )}
          </div>
          {/* Date of Birth */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Date of Birth :</label>
            {editMode ? (
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.dob}</span>
            )}
          </div>
          {/* Gender */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Gender :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.gender}</span>
            )}
          </div>
          {/* Profile Rating */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Profile Rating :</label>
            <span className={styles.formValue}>{formData.profileRating}</span>
          </div>
          {/* Email */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Email :</label>
            <span className={styles.formValue}>{formData.email}</span>
          </div>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Password :</label>
            <div className={styles.passwordField}>{"*********** "} <Edit2 size={15}/></div>
          </div>

          <h3>Preferences</h3>
          {/* Drinking */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Drinking :</label>
            {editMode ? (
              <button
                type="button"
                className={`${styles.toggleBtn} ${formData.drinking ? styles.active : ""}`}
                onClick={() =>
                  setFormData({ ...formData, drinking: !formData.drinking })
                }
              >
                {formData.drinking ? "Yes" : "No"}
              </button>
            ) : (
              <span className={styles.formValue}>
                {formData.drinking ? "Yes" : "No"}
              </span>
            )}
          </div>
          {/* Smoking */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Smoking :</label>
            {editMode ? (
              <button
                type="button"
                className={`${styles.toggleBtn} ${formData.smoking ? styles.active : ""}`}
                onClick={() =>
                  setFormData({ ...formData, smoking: !formData.smoking })
                }
              >
                {formData.smoking ? "Yes" : "No"}
              </button>
            ) : (
              <span className={styles.formValue}>
                {formData.smoking ? "Yes" : "No"}
              </span>
            )}
          </div>
          {/* Driving */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Driving :</label>
            {editMode ? (
              <button
                type="button"
                className={`${styles.toggleBtn} ${formData.driving ? styles.active : ""}`}
                onClick={() =>
                  setFormData({ ...formData, driving: !formData.driving })
                }
              >
                {formData.driving ? "Yes" : "No"}
              </button>
            ) : (
              <span className={styles.formValue}>
                {formData.driving ? "Yes" : "No"}
              </span>
            )}
          </div>
          {/* Native */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Native :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.native}
                onChange={(e) =>
                  setFormData({ ...formData, native: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.native}</span>
            )}
          </div>
          {/* Phone No */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Phone No : </label>
            {editMode ? (
              <input
                type="text"
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.phoneNo}</span>
            )}
          </div>
          {/* Pronouns */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Pronouns :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.pronouns}
                onChange={(e) =>
                  setFormData({ ...formData, pronouns: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.pronouns}</span>
            )}
          </div>
          {/* Religion */}
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Religion :</label>
            {editMode ? (
              <input
                type="text"
                value={formData.religion}
                onChange={(e) =>
                  setFormData({ ...formData, religion: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.religion}</span>
            )}
          </div>
          <h3>About</h3>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Bio :</label>
            {editMode ? (
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            ) : (
              <span className={styles.formValue}>{formData.bio}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfilePage;
