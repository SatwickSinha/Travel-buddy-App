import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BASE } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../GlobalUserContext";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Plane,
  Coffee,
  Mountain,
  Landmark,
  Crown,
  Car,
  Leaf,
  Wallet,
  Briefcase,
  X,
  Camera,
  HelpCircle,
  Footprints,
  Star,
  Waves,
  Sailboat,
  Anchor,
  Sun,
  Zap,
  Snowflake,
  BookOpen,
  Music,
  Palette,
  Building,
  ShoppingCart,
  Martini,
  HeartHandshake,
  Utensils,
  Beer,
  PawPrint,
} from "lucide-react";

const Card = ({ card, onSwipe, setDirection }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState(null);
  const startPos = useRef({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });

    // Determine swipe direction
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? "right" : "left");
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 150) {
      if (dragOffset.x > 0) {
        setDirection("LIKE");
      } else {
        setDirection("Reject");
      }
    }

    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  const getTripTypeIcon = (type) => {
    const iconMap = {
      Adventure: Mountain,
      Relaxation: Coffee,
      Cultural: Landmark,
      Luxury: Crown,
      "Road Trip": Car,
      Nature: Leaf,
      Budget: Wallet,
      Romantic: Heart,
      Business: Briefcase,
    };
    return iconMap[type] || HelpCircle;
  };

  const getInterestIcon = (interest) => {
    const iconMap = {
      Hiking: Footprints,
      "Nature Tours": Leaf,
      Stargazing: Star,
      Swimming: Waves,
      Rafting: Sailboat,
      "Fishing/Boating": Anchor,
      "Beach Activities": Sun,
      "Adventure Sports": Zap,
      Snowboarding: Snowflake,
      "Cultural Sites": Landmark,
      "Historical Walks": BookOpen,
      // Museums: ,
      "Art Galleries": Palette,
      Concerts: Music,
      "City Tours": Building,
      Shopping: ShoppingCart,
      Nightlife: Martini,
      Photography: Camera,
      Volunteering: HeartHandshake,
      "Food Tours": Utensils,
      "Brewery Tours": Beer,
      // Spa: ,
      "Zoos/Aquariums": PawPrint,
    };

    // Fallback icon if the activity is not found
    return iconMap[interest] || "HelpCircle";
  };

  return (
    <motion.div
      className={styles.card}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      style={{ x, opacity }}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img src={card.photo} alt={card.name} className={styles.profileImage} />

        {/* Swipe Indicators */}
        {swipeDirection === "right" && (
          <div className={`${styles.swipeIndicator} ${styles.likeIndicator}`}>
            <Heart size={40} />
            <span>LIKE</span>
          </div>
        )}
        {swipeDirection === "left" && (
          <div className={`${styles.swipeIndicator} ${styles.rejectIndicator}`}>
            <X size={40} />
            <span>NOPE</span>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className={styles.profileInfo}>
        <div className={styles.profileHeader}>
          <h2>
            {card.name}, {card.age}
          </h2>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{card.location}</span>
          </div>
        </div>

        <div className={styles.tripdetails}>
          <div className={styles.tripitem}>
            <Plane size={16} />
            <span>{card.destination}</span>
          </div>
          <div className={styles.tripitem}>
            <Calendar size={16} />
            <span>{card.travelDate}</span>
          </div>
          <div className={styles.tripitem}>
            <Users size={16} />
            <span>{card.groupSize}</span>
          </div>
        </div>

        <div className={styles.interestscontainer}>
          <h4>Type Of Trip</h4>
          <div className={styles.interestsgrid}>
            {card.tripType?.map((trip, index) => {
              const IconComponent = getTripTypeIcon(trip);
              return (
                <div key={index} className={styles.interesttag}>
                  <IconComponent size={14} />
                  <span>{trip}</span>
                </div>
              );
            })}
          </div>
        </div>


        <div className={styles.additionalinfo}>
          <div className={styles.infogrid}>
            <div className={styles.infoitem}>
              <span className={styles.label}>Budget:</span>
              <span className={styles.value}>{card.budget}</span>
            </div>
            <div className={styles.infoitem}>
              <span className={styles.label}>Languages:</span>
              {/* <span className="value">{card.language?.join(", ")}</span> */}
            </div>
            <div className={styles.infoitem}>
              <span className={styles.label}>Style:</span>
              <div className={styles.personalitytags}>
                {card.activities?.map((trait, index) => {
                  const IconCom = getInterestIcon(trait);
                  return(<span key={index} className={styles.personalitytag}>
                    <IconCom size={14} /> {trait}
                  </span>)
                })}
              </div>
            </div>
        <div className={styles.biosection}>
          <p>Notes:</p>
          <p>{card.notes || "NA"}</p>
        </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [cards, setCards] = useState([
    {
      name: "Suii",
      age: "20",
      location: "IDK",
      tripType: ["Business", "Budget"],
      destination: "Mumbai",
      groupSize: "3",
      activities: ["City Tours", "Nightlife", "Photography"],
      contact: "12345689",
      totalCost: "15000",
      travelDate: "12/12/25",
      budget: "5000",
      notes: "Nothing",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state, dispatch } = useUser();
  const [direction, setDirection] = useState(null);

  const fetchCards = async () => {
    try {
      const res = await fetch(`${BASE}/recommendations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched cards:", data);
        // setCards(data);
      } else if (res.status === 403) {
        toast.error("Token Invalid Login Again");
        setTimeout(() => {
          sessionStorage.removeItem("userToken");
          dispatch({ type: "CLEAR_USER" });
          navigate("/login", { replace: true });
        }, 3000);
      } else {
        toast.error("Someting went wrong");
      }
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

  const handleSwipe = (card) => {
    setCards((prev) => prev.filter((e) => e._id !== card._id));
  };

  if (loading) {
    return <div className={styles.loading}>Loading cards...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onSwipe={handleSwipe}
          setDirection={setDirection}
        />
      ))}
    </div>
  );
};

export default Home;
