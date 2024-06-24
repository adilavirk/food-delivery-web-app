import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      <div className="explore-menu-list">
        {menu_list?.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item?.menu_name ? "All" : item?.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item?.menu_name ? "active" : ""}
              src={item?.menu_image}
              alt={`${item?.menu_name}'s Image`}
            />
            <p>{item?.menu_name}</p>
          </div>
        ))}
      </div>
      {/* to add horizontal line below the menu-list-items */}
      <hr />
    </section>
  );
};

export default ExploreMenu;