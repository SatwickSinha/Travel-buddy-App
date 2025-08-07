import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE } from "../../../api.js";
import { toast } from "react-toastify";
import { useUser } from "../../GlobalUserContext.jsx";

const LoginSection = ({ setstate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user != null && typeof state.user.username != 'undefined') {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(BASE + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Login Successful");
        localStorage.setItem("userToken", data.token);
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id:
            "758980849951-p8lnc4rg3v99b8eqrc4n7lcc262gc219.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large" }
        );
      }
    };
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch(BASE + "/auth/google/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Google Login Successful");
        localStorage.setItem("userToken", data.token);
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        toast.error(data.message || "Google login failed.");
      }
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <form className="form-section" onSubmit={handleLogin}>
      <div className="form-content">
        <input
          type="email"
          placeholder="Email Address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="links-container">
          <Link to="/forgot-password" className="link">
            Forget Password
          </Link>
          <div to="/signup" className="link" onClick={() => setstate(1)}>
            Create Account
          </div>
        </div>
        <button className="login-button" type="submit">
          Log in
        </button>

        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">OR</span>
          <hr className="divider-line" />
        </div>

        <div id="google-signin-btn" style={{ marginTop: "16px" }}></div>
      </div>
    </form>
  );
};

export default LoginSection;
