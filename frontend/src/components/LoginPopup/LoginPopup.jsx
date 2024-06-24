import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const { url, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      // Logging the response for debugging
      console.log("Response from server:", response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle any unexpected errors during the request
      console.error("Error during login/register request:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross icon image"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? null : (
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create  Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </section>
  );
};

export default LoginPopup;
