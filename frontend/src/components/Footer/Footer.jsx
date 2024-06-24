import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { footer_icons } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* footer left side */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            At Tomato, we believe in the power of fresh, wholesome food to bring
            people together. Our mission is to provide you with the finest
            ingredients, delicious recipes, and an unforgettable culinary
            experience. Whether you&apos;re looking for inspiration for your
            next meal or a place to find the best local produce, Tomato is your
            go-to destination for all things food.Thank you for visiting Tomato
            – where every meal is a story waiting to be told.
          </p>
          {/* footer icons */}
          <div className="footer-social-icons">
            {footer_icons?.map((item, index) => (
              <a key={index} href={item?.link}>
                <img src={item?.icon} alt={item?.name} />
              </a>
            ))}
          </div>
        </div>
        {/* footer right side */}
        <div className="footer-content-right">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* footer content center */}

        <div className="footer-content-center">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      {/* to add horizontal line */}
      <hr />
      <p className="footer-copyright">
        Copyright © 2024 Tomato. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
