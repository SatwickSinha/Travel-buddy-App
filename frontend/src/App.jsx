import React from "react";
import { BrowserRouter, Routes, Route, Outlet  } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/Profile/ProfilePage";
import TravelDating from "./pages/Swipe/TravelDating";
// import TravelBuddyFinder from "./pages/Swipe/TravelBuddyFinder";
import AddTravelDetails from "./pages/AddDetails/AddTravelDetails";
import AddProfile from "./pages/Profile/AddProfile";
import { useUser } from "./GlobalUserContext";
import NavBar from "./pages/NavBar/nav";

function App() {
  const { state } = useUser();
  const userLoggedIn = state.user != null && typeof state.user.username != "undefined";

  const LayoutWithNavbar = () => (
    <NavBar components={<Outlet />} />
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/findTravel" element={<TravelDating />} />
        <Route path="/CreateProfile" element={<AddProfile />} />
      {userLoggedIn && (
        <Route element={<LayoutWithNavbar />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/AddTrip" element={<AddTravelDetails />} />
        </Route>
      )}
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
