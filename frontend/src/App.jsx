import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import VerifyOrder from "./pages/VerifyOrder/VerifyOrder";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  // state to display LoginPopup

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <section className="app">
        <Navbar setShowLogin={setShowLogin} />

        {/* setup the routes here */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<VerifyOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </section>

      <Footer />
    </>
  );
};

export default App;
