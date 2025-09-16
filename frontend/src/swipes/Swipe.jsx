// src/pages/SwipePage.jsx
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./SwipePage.css";
import { BASE } from "../../api";
import { toast } from "react-toastify";
import { useUser } from "../GlobalUserContext";

const SwipeCard = ({ user, onSwipe }) => {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipe("right", user);
      controls.start({ x: 500, opacity: 0 });
    } else if (info.offset.x < -100) {
      onSwipe("left", user);
      controls.start({ x: -500, opacity: 0 });
    } else {
      controls.start({ x: 0, opacity: 1 }); // snap back
    }
  };

  return (
    <motion.div
      className="card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 0, opacity: 1 }}
    >
      <img src={user.photo} alt={user.name} className="card-image" />
      <div className="card-details">
        <h2>
          {user.name},{" "}
          {new Date().getFullYear() - new Date(user.dob).getFullYear()}
        </h2>
        <p className="bio">{user.bio}</p>
        <div className="tags">
          {user.language.map((lang) => (
            <span key={lang} className="tag blue">
              {lang}
            </span>
          ))}
          {user.interestType.map((interest) => (
            <span key={interest} className="tag green">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SwipePage = () => {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(BASE + `/getAllProfile`, {
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
          console.log(data);

          setUsers(data);
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

  const handleSwipe = (direction, user) => {
    console.log(`You swiped ${direction} on ${user.name}`);
    setCurrentIndex((prev) => prev + 1); // go to next card
  };

  const handleButtonSwipe = (direction) => {
    if (currentIndex < users.length) {
      handleSwipe(direction, users[currentIndex]);
    }
  };

  return (
    <div className="swipe-page">
      <h1 className="title">Find a Travel Buddy</h1>
      <div className="card-container">
        {[...users]
          .slice(currentIndex)
          .reverse()
          .map((user) => (
            <SwipeCard key={user._id} user={user} onSwipe={handleSwipe} />
          ))}
      </div>

      {/* Arrow buttons for PC users */}
      <div className="buttons">
        <button
          className="btn dislike"
          onClick={() => handleButtonSwipe("left")}
        >
          ⬅️
        </button>
        <button className="btn like" onClick={() => handleButtonSwipe("right")}>
          ➡️
        </button>
      </div>
    </div>
  );
};

export default SwipePage;
