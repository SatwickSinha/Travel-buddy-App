import { useState } from "react";
import "./LoginPage.css";
import LoginSection from "./LoginSection.jsx";
import SignupSection from "./SignUpSection.jsx";

const LoginPage = () => {
  const [state, setState] = useState(0);

  return (
    <div className="main-container">
      <div className="overlay"></div>
      <div className="login-card">
        <div className="branding-section">
          <div>
            <h1 className="logo">Tripglo</h1>
            <p className="join-text">Join for free</p>
            <h2 className="tagline">
              Unleash the Travel inside YOU, Do not need to beg ANYONE!
              <br />
              We will Connect YOU With New BUDDY
            </h2>
          </div>
        </div>

        {state === 0 ? (
          <LoginSection setstate={setState} />
        ) : (
          <SignupSection setstate={setState} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
