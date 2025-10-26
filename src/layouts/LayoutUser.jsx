import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const LayoutUser = () => {
  const { getRole } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (getRole() != "user") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h2>User layout</h2>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUser;
