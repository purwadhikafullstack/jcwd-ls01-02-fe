import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";
import Address from "./Pages/Address";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";
import Prescription from "./Pages/Prescription";
import Profile from "./Pages/Profile";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterSuccess from "./Pages/RegisterSuccess";
import Verification from "./Pages/Verification";
import ResetPassword from "./Pages/ResetPassword";

import Admin from "./Pages/Admin";

function App() {
  const location = useLocation();
  //
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname.match("/reset-password/") ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/registered" element={<RegisterSuccess />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/myaccount" element={<Profile />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname.match("/reset-password/") ? null : (
        <Footer />
      )}
      <ToastContainer
        pauseOnFocusLoss={false}
        autoClose={1000}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
