import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../Admin/pages/Dashboard";
import Login from "../Admin/pages/Login";
import Orders from "../Admin/pages/Orders";
import Products from "../Admin/pages/Products";
import Report from "../Admin/pages/Report";
import Sales from "../Admin/pages/Sales";
import LeftbarAdmin from "../Admin/components/Leftbar";
import NavbarAdmin from "../Admin/components/Navbar";

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin/") {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      {location.pathname === "/admin" ? null : <NavbarAdmin />}
      {location.pathname === "/admin" ? null : <LeftbarAdmin />}

      <Routes>
        <Route path="" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders/:status" element={<Orders />} />
        <Route path="report" element={<Report />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
    </>
  );
}

export default Admin;
