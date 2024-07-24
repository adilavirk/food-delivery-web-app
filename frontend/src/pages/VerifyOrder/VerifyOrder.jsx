import React, { useContext, useEffect } from "react";
import "./VerifyOrder.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("Verifying payment for order:", orderId); // Log order ID
      console.log("Payment success status:", success); // Log success status

      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      console.log("Verification response:", response.data); // Log the response data

      if (response?.data?.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); // Only run on mount

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default VerifyOrder;
