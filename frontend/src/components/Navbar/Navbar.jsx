import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets, navbarMenu } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { cartItems, getTotalProducts, token, setToken } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // to add underline effect to menu items
  const [menu, setMenu] = useState("home");
  return (
    <nav className="navbar navbar-sticky">
      {/* logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      {/* navbar menu */}
      <ul className="navbar-menu">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        {navbarMenu.map((item, index) => (
          <a
            key={index}
            href={item?.id}
            onClick={() => setMenu(`${item?.name}`)}
            className={menu === `${item?.name}` ? "active" : ""}
          >
            {item?.name}
          </a>
        ))}
      </ul>
      {/* navbar right side */}
      <div className="navbar-right">
        {/* search icon */}
        <img src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
          {/* basket icon /cart icon */}
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="basket icon" />
          </Link>
          <div>
            {Object.keys(cartItems).length > 0 && (
              <div className="dot">{getTotalProducts()}</div>
            )}
          </div>
          {/* <div className={Object.keys(cartItems).length === 0 ? "" : "dot"}>
            {Object.keys(cartItems).length === 0 ? "" : getTotalProducts()}
          </div> */}
        </div>
        {/* Sign In button */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile image" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="bag icon image" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
