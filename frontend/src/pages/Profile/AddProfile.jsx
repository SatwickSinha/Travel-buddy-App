import React, { useState, useEffect } from "react";
import styles from "./AddProfile.module.css";

const AddProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedLifestyle, setSelectedLifestyle] = useState(new Set());
  const [errors, setErrors] = useState({});

  const totalSteps = 8;

  const stepDescriptions = [
    "Let's get started",
    "Tell us your name",
    "Contact information",
    "Personal details",
    "Your identity",
    "Lifestyle preferences",
    "Share your story",
    "Profile complete",
  ];

  const updateProgress = () => {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return progress;
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 2:
        if (!formData.name?.trim()) {
          newErrors.name = "Please enter your name";
        }
        break;
      case 3:
        if (!formData.email?.trim()) {
          newErrors.email = "Please enter your email address";
        } else if (!isValidEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if(!formData.phoneNo?.trim()){
          newErrors.phoneNo = "Please Enter your phone number";
        } else if (!/^\d{10}$/.test(formData.phoneNo)){
          newErrors.phoneNo = "Please Enter a valid phone number";
        }
        break;
      case 4:
        if(!formData.dob?.trim()){
          newErrors.dob = "Please enter your DOB";
        }
        if(!formData.native?.trim()){
          newErrors.native = "Please enter your nationality";
        }
        break;
      case 5:
        if(typeof formData.gender == "undefined"){
          newErrors.gender = "Please select your gender";
        }
        break;
      default:
        return true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleLifestyleToggle = (lifestyle) => {
    const newSelected = new Set(selectedLifestyle);
    if (newSelected.has(lifestyle)) {
      newSelected.delete(lifestyle);
    } else {
      newSelected.add(lifestyle);
    }
    setSelectedLifestyle(newSelected);
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeProfile();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const jumpToStep = (stepNumber) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const completeProfile = () => {
    const finalData = {
      ...formData,
      drinking: selectedLifestyle.has("drinking"),
      smoking: selectedLifestyle.has("smoking"),
      driving: selectedLifestyle.has("driving"),
      profileRating: 0,
    };

    console.log("Complete Travel Buddy Profile:", finalData);

    // Here you would typically make an API call
    // Example: await createProfile(finalData);

    alert("🎉 Welcome to Travel Buddy! Your profile is now live!");
  };

  const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
      if (currentStep === totalSteps) {
        const interval = setInterval(() => {
          const newParticle = {
            id: Math.random(),
            left: Math.random() * 100,
            color: ["#667eea", "#764ba2", "#10b981", "#f093fb", "#FFD700"][
              Math.floor(Math.random() * 5)
            ],
            delay: Math.random() * 2,
            duration: 4 + Math.random() * 2,
          };

          setParticles((prev) => [...prev, newParticle]);

          setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
          }, 6000);
        }, 200);

        return () => clearInterval(interval);
      }
    }, [currentStep]);

    return (
      <div className={styles.floatingParticles}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.left}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.mainContaner} >
    <div className={styles.mainContent}>
      <div className={styles.webappContainer}>
        <FloatingParticles />

        <div className={styles.headerSection}>
          <div className={styles.headercontent}>
            <div className={styles.logo}>✈️</div>
            <h1 className={styles.headerTitle}>Travel Buddy</h1>
            <p className={styles.headerSubtitle}>
              Create your profile to connect with amazing travel companions
              worldwide
            </p>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${updateProgress()}%` }}
                />
              </div>
              <div className={styles.stepInfo}>
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{stepDescriptions[currentStep - 1]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <nav className={styles.sidebar}>
            <ul className={styles.stepNav}>
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;
                const stepTitles = [
                  "Welcome",
                  "Your Name",
                  "Contact Info",
                  "Personal Details",
                  "Identity",
                  "Lifestyle",
                  "About You",
                  "Complete",
                ];

                return (
                  <li
                    key={stepNum}
                    className={`${styles.stepNavItem} ${
                      isActive ? styles.active : ""
                    } ${isCompleted ? styles.completed : ""}`}
                    onClick={() => jumpToStep(stepNum)}
                  >
                    <div className={styles.stepNumber}>
                      {isCompleted ? "✓" : stepNum}
                    </div>
                    <div className={styles.stepTitle}>{stepTitles[index]}</div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <main className={styles.contentArea}>
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.welcomeContent}>
                  <div className={styles.welcomeEmoji}>🌍</div>
                  <div className={styles.contentHeader}>
                    <h2 className={styles.contentTitle}>Welcome to Travel Buddy!</h2>
                    <p className={styles.contentSubtitle}>
                      Ready to find your perfect travel companion? Let's create
                      your profile in just a few simple steps. Connect with
                      fellow travelers who share your passion for adventure and
                      exploration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Name */}
            {currentStep === 2 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>What's your name?</h2>
                  <p className={styles.contentSubtitle}>
                    This is how other travelers will know you. Make it friendly
                    and approachable!
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`${styles.inputArea} ${errors.name ? styles.error : "" } `}
                  />
                  {errors.name && (
                    <div className={styles.errorMessage}>{errors.name}</div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>How can we reach you?</h2>
                  <p className={styles.contentSubtitle}>
                    Your contact information will be kept private and only
                    shared when you connect with someone.
                  </p>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your@email.com"
                      className={`${styles.inputArea} ${errors.email ? styles.error : "" } `}
                    />
                    {errors.email && (
                      <div className={styles.errorMessage}>{errors.email}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      id="phoneNo"
                      value={formData.phoneNo || ""}
                      onChange={(e) =>
                        handleInputChange("phoneNo", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      className={`${styles.inputArea} ${errors.phoneNo ? styles.error : "" } `}
                    />
                    {errors.phoneNo && (
                      <div className={styles.errorMessage}>{errors.phoneNo}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Personal Details */}
            {currentStep === 4 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Tell us about yourself</h2>
                  <p className={styles.contentSubtitle}>
                    This helps us match you with compatible travel companions.
                  </p>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      value={formData.dob || ""}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      className={`${styles.inputArea} ${errors.dob ? styles.error : "" } `}
                    />
                    {errors.dob && (
                      <div className={styles.errorMessage}>{errors.dob}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="native">Nationality</label>
                    <input
                      type="text"
                      id="native"
                      value={formData.native || ""}
                      onChange={(e) =>
                        handleInputChange("native", e.target.value)
                      }
                      placeholder="e.g., American, Indian, British"
                      className={`${styles.inputArea} ${errors.native ? styles.error : "" } `}
                    />
                    {errors.native && (
                      <div className={styles.errorMessage}>{errors.native}</div>
                    )}
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="religion">Religion (Optional)</label>
                    <input
                      type="text"
                      id="religion"
                      value={formData.religion || ""}
                      onChange={(e) =>
                        handleInputChange("religion", e.target.value)
                      }
                      placeholder="e.g., Christianity, Islam, Buddhism, etc."
                      className={`${styles.inputArea} ${errors.name ? styles.error : "" } `}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Identity */}
            {currentStep === 5 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>How do you identify?</h2>
                  <p className={styles.contentSubtitle}>
                    Help others know how to address you respectfully.
                  </p>
                </div>
                <div className={styles.optionCards}>
                  {[
                    { value: "male", emoji: "👨", text: "Male" },
                    { value: "female", emoji: "👩", text: "Female" },
                    { value: "non-binary", emoji: "🧑", text: "Non-binary" },
                    { value: "other", emoji: "✨", text: "Other" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`${styles.optionCard} ${
                        formData.gender === option.value ? styles.selected : ""
                      }`}
                      onClick={() => handleInputChange("gender", option.value)}
                    >
                      <span className={styles.optionEmoji}>{option.emoji}</span>
                      <div className={styles.optionText}>{option.text}</div>
                    </div>
                  ))}
                </div>
                {errors.gender && (
                      <div className={styles.errorMessage}>{errors.gender}</div>
                    )}
                {/* <div className={`${styles.formGroup} ${styles.marginTop30}`}>
                  <label htmlFor="pronouns">Pronouns (Optional)</label>
                  <select
                    id="pronouns"
                    value={formData.pronouns || ""}
                    onChange={(e) =>
                      handleInputChange("pronouns", e.target.value)
                    }
                    className={`${styles.inputArea} ${errors.name ? styles.error : "" } `}
                  >
                    <option value="">Select your pronouns</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="they/them">They/Them</option>
                    <option value="other">Other</option>
                  </select>
                </div> */}
              </div>
            )}

            {/* Step 6: Lifestyle */}
            {currentStep === 6 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Your lifestyle preferences</h2>
                  <p className={styles.contentSubtitle}>
                    Select all that apply to help match you with like-minded
                    travelers.
                  </p>
                </div>
                <div className={styles.lifestyleGrid}>
                  {[
                    {
                      value: "drinking",
                      emoji: "🍷",
                      title: "Social Drinking",
                      desc: "I enjoy having drinks while traveling and socializing",
                    },
                    {
                      value: "smoking",
                      emoji: "🚬",
                      title: "Smoking",
                      desc: "I'm a smoker and comfortable around smoking",
                    },
                    {
                      value: "driving",
                      emoji: "🚗",
                      title: "Can Drive",
                      desc: "I have a valid license and can drive during trips",
                    },
                  ].map((lifestyle) => (
                    <div
                      key={lifestyle.value}
                      className={`${styles.lifestyleCard} ${
                        selectedLifestyle.has(lifestyle.value) ? styles.selected : ""
                      }`}
                      onClick={() => handleLifestyleToggle(lifestyle.value)}
                    >
                      <span className={styles.lifestyleEmoji}>{lifestyle.emoji}</span>
                      <div className={styles.lifestyleInfo}>
                        <h3>{lifestyle.title}</h3>
                        <p>{lifestyle.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Bio */}
            {currentStep === 7 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Tell your travel story</h2>
                  <p className={styles.contentSubtitle}>
                    Share what makes you an awesome travel companion and what
                    you're looking for in your next adventure.
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="bio">About You</label>
                  <textarea
                    id="bio"
                    value={formData.bio || ""}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about your travel style, favorite destinations, interests, and what you're looking for in a travel buddy. Are you into adventure sports, cultural experiences, food tours, or relaxing beach getaways? The more you share, the better we can match you with compatible travelers!"
                    className={`${styles.inputArea} ${errors.name ? styles.error : "" } `}
                  />
                </div>
              </div>
            )}

            {/* Step 8: Complete */}
            {currentStep === 8 && (
              <div className={`${styles.stepContent} ${styles.active}`}>
                <div className={styles.completionContent}>
                  <div className={styles.completionEmoji}>🎉</div>
                  <div className={styles.contentHeader}>
                    <h2 className={styles.contentTitle}>You're all set!</h2>
                    <p className={styles.contentSubtitle}>
                      Your travel profile is complete and ready to go live.
                      Start connecting with amazing travel companions who share
                      your passion for adventure and exploration!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.actionSection}>
              <button
                className={`${styles.btn} ${styles.btnBack}`}
                onClick={prevStep}
                style={{ visibility: currentStep > 1 ? "visible" : "hidden" }}
              >
                ← Previous
              </button>
              <div style={{ flex: 1 }}></div>
              <button
                className={`${styles.btn} ${styles.btnNext}`}
                onClick={nextStep}
                style={{
                  background:
                    currentStep === totalSteps
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #667eea, #764ba2)",
                }}
              >
                {currentStep === totalSteps
                  ? "Create Profile 🚀"
                  : currentStep === 1
                  ? "Get Started →"
                  : "Continue →"}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddProfile;
