import { useState } from "react";
import { BASE } from "../../../api.js";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const SignupSection = ({ setstate }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const checkPasswordStrength = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
    };
  };

  const passwordRequirements = checkPasswordStrength(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !firstName.trim().length ||
      !lastName.trim().length ||
      !email.trim().length
    ) {
      toast.error("Fields Cannot Be Empty");
      return;
    }

    const requirementsMet =
      passwordRequirements.hasLowerCase &&
      passwordRequirements.hasNumbers &&
      passwordRequirements.hasSpecialChar &&
      passwordRequirements.hasUpperCase &&
      passwordRequirements.isLongEnough
    ;

    if (!requirementsMet){
        toast.error("Password doesnt meet the requirments");
        return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(BASE + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: firstName + " " + lastName,
          email: email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please log in.");
        navigate("/addProfile", { state: { data:data._id }})
      } else {
        toast.error("Signup failed.");
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

//   const headers = {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Origin: "*",
//           Authorization: `Bearer ${localStorage.getItem(
//             `userToken`
//           )}`,
//         };



  return (
    <form className={styles.formContent} onSubmit={handleSignup}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="First Name"
          className={styles.inputField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.inputField}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <input
        type="email"
        placeholder="Email Address"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ul className={styles.passwordRequirements}>
        <li
          className={passwordRequirements.isLongEnough ? styles.requirementMet : ""}
        >
          At least 8 characters
        </li>
        <li
          className={passwordRequirements.hasUpperCase ? styles.requirementMet : ""}
        >
          One uppercase letter
        </li>
        <li
          className={passwordRequirements.hasLowerCase ? styles.requirementMet : ""}
        >
          One lowercase letter
        </li>
        <li
          className={passwordRequirements.hasNumbers ? styles.requirementMet : ""}
        >
          One number
        </li>
        <li
          className={
            passwordRequirements.hasSpecialChar ? styles.requirementMet : ""}
        >
          One special character
        </li>
      </ul>

      <input
        type="password"
        placeholder="Confirm Password"
        className={styles.inputField}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className={styles.linksContainer}>
        <div to="/" className={styles.link} onClick={() => setstate(0)}>
          Already have an account?
        </div>
      </div>

      <button className={styles.loginButton} type="submit">
        Create Account
      </button>
    </form>
  );
};

export default SignupSection;
