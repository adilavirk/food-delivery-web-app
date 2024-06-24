import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, getTotalProducts, url } =
    useContext(StoreContext);

  return (
    <section className="food-item">
      {/* product image */}
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt={`${name}'s Image`}
        />

        {!cartItems[id] ? (
          // when state value is 0
          <img
            src={assets.add_icon_white}
            alt="add icon image"
            className="add"
            onClick={() => {
              addToCart(id),
                toast.success(`${name} is added to cart successfuly!`);
            }}
          />
        ) : (
          // when state value is greater than 1
          <div className="food-item-counter">
            <img
              onClick={() => {
                removeFromCart(id),
                  toast.success(`${name} is removed from cart successfuly!`);
              }}
              src={assets.remove_icon_red}
              alt=" remove icon image"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => {
                addToCart(id),
                  toast.success(`${name} is added to cart successfuly!`);
              }}
              src={assets.add_icon_green}
              alt="add icon image"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        {/* product name and star rating */}
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="food item rating star image" />
        </div>

        {/* food item description */}
        <p className="food-item-desc">{description}</p>

        {/* food item price */}

        <p className="food-item-price">${price}</p>
      </div>
    </section>
  );
};

export default FoodItem;
