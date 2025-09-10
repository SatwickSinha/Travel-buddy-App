import {
  Home,
  MapPin,
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronDown,
  Plane,
  Heart,
  Book,
  Settings,
  Menu,
} from "lucide-react";
import styles from "./NavBar.module.css";
import { useEffect, useRef, useState } from "react";
import useIsMobile from "../../isMobile.js";

const NavBar = ({ components }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState({});
  const isMobile = useIsMobile();  
  const sidebarRef = useRef(null); 
  const [isOpen, setIsOpen] = useState(!isMobile);
  const sidebarItems = [
    { id: "home", label: "Home", icon: Home, active: false },
    {
      id: "trips",
      label: "Trips",
      icon: Plane,
      active: true,
      hasSubmenu: true,
    },
    {
      id: "join",
      label: "Join a trip",
      icon: Users,
      active: false,
      isSubItem: true,
    },
    { id: "buddies", label: "My buddies", icon: Heart, active: false },
    {
      id: "plans",
      label: "Travel plans",
      icon: Calendar,
      active: false,
      hasSubmenu: true,
    },
    {
      id: "destinations",
      label: "Destinations",
      icon: MapPin,
      active: false,
      hasSubmenu: true,
    },
    {
      id: "chats",
      label: "Group chats",
      icon: MessageSquare,
      active: false,
      hasSubmenu: true,
    },
    { id: "itineraries", label: "Itineraries", icon: Book, active: false },
  ];

  const toggleSidebarDropDown = (itemId) => {
    setSidebarCollapsed((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {     
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen]);

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${isOpen? styles.open : styles.close}` } ref={sidebarRef}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Plane size={24} className={styles.logoIcon} />
            <span className={styles.logoText}>Travel</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <div
                className={`${styles.sidebarItem} ${
                  item.active ? styles.activeItem : ""
                } ${item.isSubItem ? styles.subItem : ""}`}
                onClick={() => item.hasSubmenu && toggleSidebarDropDown(item.id)}
              >
                <div className={styles.sidebarItemContent}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown
                    size={16}
                    className={`${styles.submenuArrow} ${
                      sidebarCollapsed[item.id] ? styles.collapsed : ""
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton}>
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.header}>
            <button className={styles.headerButton} onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          <div className={styles.headerActions}>
            <button className={styles.headerButton}>
              <Calendar size={20} />
            </button>
            <button className={styles.headerButton}>
              <Settings size={20} />
            </button>
            <button className={styles.headerButton}>
              <MessageSquare size={20} />
            </button>
            <div className={styles.profileButton}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>
        </header>

        {components}
      </div>
    </div>
  );
};

export default NavBar;
