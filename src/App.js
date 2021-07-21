import React from "react";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import "./app.css";
import { useState } from "react";
import LoginPage from "./LoginPage/LoginPage";

const App = () => {
  const [navbarHeight, setNavbarHeight] = useState("2rem");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar navbarHeight={navbarHeight} />
      {/* {isLoggedIn ? ( */}
      <Dashboard navbarHeight={navbarHeight} />
      {/* ) : (
        <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )} */}
    </>
  );
};

export default App;
