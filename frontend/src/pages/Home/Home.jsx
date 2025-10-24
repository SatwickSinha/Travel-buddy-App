import "./Home.css";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BASE } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../GlobalUserContext";


const Card = ({ card, onSwipe }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    if (offsetX > 200) {
      console.log("Card swiped right");
      onSwipe(card, "right");
    } else if (offsetX < -200) {
      console.log("Card swiped left");
      onSwipe(card, "left");
    }
    x.set(0); // reset card back if not swiped enough
  };

  return (
    <motion.div
      key={card._id}
      className="card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      style={{ x, opacity, rotate }}
      onDragEnd={handleDragEnd}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${card.photo?.url})` }}
      ></div>

      <div className="card-text">
        <h2>{card.name}</h2>
        <p>Age: {card.dob ? new Date().getFullYear() - new Date(card.dob).getFullYear() : "N/A"}</p>
        <p>Location Pref: {card.locationPref?.join(", ")}</p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { dispatch } = useUser(); 

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("No token found, please log in again.");
        setTimeout(() => {
          localStorage.removeItem("userToken");
          dispatch({ type: "CLEAR_USER" });
          navigate("/", { replace: true });
        }, 2000);
        return;
      }

      const res = await fetch(`${BASE}/recommendations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          toast.error("Token invalid, please log in again.");
          setTimeout(() => {
            localStorage.removeItem("userToken");
            dispatch({ type: "CLEAR_USER" });
            navigate("/", { replace: true });
          }, 2000);
        } else {
          toast.error(`Something went wrong (${res.status})`);
        }
        return;
      }

      const data = await res.json();
      console.log("Fetched cards:", data.slice(0, 5));
      setCards(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();    
  }, []);

  const handleSwipe = (card, direction) => {
    setCards((prev) => prev.filter((e) => e._id !== card._id));
  };

  if (loading) {
    return <div className="loading">Loading cards...</div>;
  }

  return (
    <div className="home-container">
      {cards.map((card) => (
        <Card key={card._id} card={card} onSwipe={handleSwipe} />        
      ))}
    </div>
  );
};

export default Home;
