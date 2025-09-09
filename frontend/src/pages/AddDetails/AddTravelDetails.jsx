import React, { useState } from "react";
import {
  Calendar,
  MessageSquare,
  Settings,
  X,
  Save,
  Coffee,
  Mountain,
  Book,
} from "lucide-react";
import styles from "./AddTravelDetails.module.css";
import { toast } from "react-toastify";

const AddTravelDetails = () => {
  const [formData, setFormData] = useState({
    tripType: [],
    destination: "",
    groupSize: "",
    activities: [],
    contact: "",
    checkIn: "",
    checkOut: "",
    hotelName: "",
    totalCost: "",
    travelDate: "",
    budget: "",
    notes: "",
    booking: "",
  });

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const tripTypes = [
    { id: "Adventure", label: "Adventure", icon: Mountain },
    { id: "Relaxation", label: "Relaxation", icon: Coffee },
    { id: "Cultural", label: "Cultural", icon: Book },
  ];

  const activityOptions = [
    "Hiking",
    "Swimming",
    "Photography",
    "Food Tours",
    "Museums",
    "Shopping",
    "Nightlife",
    "Beach Activities",
    "Adventure Sports",
    "Cultural Sites",
    "Nature Tours",
    "City Tours",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTripTypeToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      tripType: prev.tripType.includes(type)
        ? prev.tripType.filter((t) => t !== type)
        : [...prev.tripType, type],
    }));
  };

  const handleActivityToggle = (activity) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSave = () => {
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      toast.info("Travel details saved successfully! 🎉");
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({
      tripType: ["Adventure"],
      destination: "",
      groupSize: "",
      activities: [],
      contact: "",
      checkIn: "",
      checkOut: "",
      hotelName: "",
      totalCost: "",
      travelDate: "",
      budget: "",
      notes: "",
      booking: "",
    });
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Add travel details</h1>
        </div>

        <form className={styles.form}>
          <div className={styles.formGrid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Trip Type */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Trip type</label>
                <div className={styles.tripTypeButtons}>
                  {tripTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`${styles.tripTypeButton} ${
                        formData.tripType.includes(type.id)
                          ? styles.tripTypeActive
                          : ""
                      }`}
                      onClick={() => handleTripTypeToggle(type.id)}
                    >
                      <type.icon size={16} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Destination</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  placeholder="Enter destination"
                />
              </div>

              {/* Group Size */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Group size</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.groupSize}
                  onChange={(e) =>
                    handleInputChange("groupSize", e.target.value)
                  }
                  placeholder="Number of travelers"
                  min="1"
                />
              </div>

              {/* Activities */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Activities</label>
                <div className={styles.activitiesGrid}>
                  {activityOptions.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      className={`${styles.activityButton} ${
                        formData.activities.includes(activity)
                          ? styles.activityActive
                          : ""
                      }`}
                      onClick={() => handleActivityToggle(activity)}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  placeholder="Email or phone number"
                />
              </div>

              {/* Total Cost */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Total cost</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.totalCost || formData.budget*formData.groupSize}
                  onChange={(e) =>
                    handleInputChange("totalCost", e.target.value)
                  }
                  placeholder="Total trip cost"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Budget */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Budget (per person)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.budget || (formData.totalCost/formData.groupSize).toFixed(0)}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="Budget per person"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* Trip Information */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Travel date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.travelDate}
                  onChange={(e) =>
                    handleInputChange("travelDate", e.target.value)
                  }
                />
              </div>

              {/* Notes */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Notes</label>
                <textarea
                  className={styles.textarea}
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes or preferences"
                  rows="4"
                />
              </div>

              {/* Accommodation Details */}
              <div className={styles.sectionTitle}>Accommodation details</div>

              {/* Hotel Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Hotel name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.hotelName}
                  onChange={(e) =>
                    handleInputChange("hotelName", e.target.value)
                  }
                  placeholder="Hotel or accommodation name"
                />
              </div>

              {/* Check-in Date */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-in date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                />
              </div>

              {/* Check-out Date */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-out date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                />
              </div>

              {/* Booking */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Booking</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.booking}
                  onChange={(e) => handleInputChange("booking", e.target.value)}
                  placeholder="Booking reference or platform"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.saveButton} ${
                showSuccessAnimation ? styles.saveButtonSuccess : ""
              }`}
              onClick={handleSave}
            >
              {showSuccessAnimation ? (
                <>
                  <div className={styles.spinner}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className={styles.successOverlay}>
          <div className={styles.successAnimation}>
            <div className={styles.checkmark}>✓</div>
            <p>Saving travel details...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTravelDetails;
