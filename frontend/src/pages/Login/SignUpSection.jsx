import { useState } from "react";
import { BASE } from "../../../api.js";
import { toast } from "react-toastify";

const SignupSection = ({ setstate }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        setstate(0);
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
    <form className="form-content" onSubmit={handleSignup}>
      <div className="input-group">
        <input
          type="text"
          placeholder="First Name"
          className="input-field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <input
        type="email"
        placeholder="Email Address"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ul className="password-requirements">
        <li
          className={passwordRequirements.isLongEnough ? "requirement-met" : ""}
        >
          At least 8 characters
        </li>
        <li
          className={passwordRequirements.hasUpperCase ? "requirement-met" : ""}
        >
          One uppercase letter
        </li>
        <li
          className={passwordRequirements.hasLowerCase ? "requirement-met" : ""}
        >
          One lowercase letter
        </li>
        <li
          className={passwordRequirements.hasNumbers ? "requirement-met" : ""}
        >
          One number
        </li>
        <li
          className={
            passwordRequirements.hasSpecialChar ? "requirement-met" : ""
          }
        >
          One special character
        </li>
      </ul>

      <input
        type="password"
        placeholder="Confirm Password"
        className="input-field"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="links-container">
        <div to="/" className="link" onClick={() => setstate(0)}>
          Already have an account?
        </div>
      </div>

      <button className="login-button" type="submit">
        Create Account
      </button>
    </form>
  );
};

export default SignupSection;
