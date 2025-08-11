import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../GlobalUserContext';
import { BASE } from '../../api';

const Dashboard = () => {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!(state.user != null && typeof state.user.username != "undefined")) {
      navigate("/", { replace: true })
    } else {
      handleGetUserInfo();
    }
  }, []);

  const handleLogout = () => {
    toast.info("Logging User Out");
    setTimeout(() => {
      sessionStorage.removeItem("userToken");
      dispatch({ type: "CLEAR_USER" });
      navigate("/", { replace: true });
    }, 1000);
  };

  const handleGetUserInfo = async () => {
    try {
      const res = await fetch(BASE + "/getUserProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "*",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      const data = await res.json()
      if (res.ok) {
        setUserData(data);
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
    } catch (err) {
      toast.error("Somting Went Wrong");
      console.log(err);
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1>Welcome to Travel Buddy Dashboard!</h1>
        <p>Hello, {state.user.username}!</p>
        <button 
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ 
        background: '#e9ecef', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <h2>Your Travel Dashboard</h2>
        <p>Welcome to your travel planning center! Here you can:</p>
        <ul>
          <li>Plan new trips</li>
          <li>Find travel buddies</li>
          <li>Explore destinations</li>
          <li>Manage your travel preferences</li>
        </ul>
        
        <div style={{ marginTop: '20px' }}>
          <h3>User Information:</h3>
          <pre style={{ 
            background: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;