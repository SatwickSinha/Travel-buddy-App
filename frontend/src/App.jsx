import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./GlobalUserContext";
// import TravelDating from "./pages/Swipe/TravelDating";
// import TravelBuddyFinder from "./pages/Swipe/TravelBuddyFinder";
// import AddTravelDetails from "./pages/Swipe/AddTravelDetails";
import AddProfile from "./pages/Profile/AddProfile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path='/idk' element={<AddTravelDetails />} /> */}
          {/* <Route path="/idk2" element={<TravelDating />} /> */}
          {/* <Route path="/idk3" element={<TravelBuddyFinder />} /> */}
          <Route path="/addProfile" element={<AddProfile />} />
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
    </UserProvider>
  );
}

export default App;
