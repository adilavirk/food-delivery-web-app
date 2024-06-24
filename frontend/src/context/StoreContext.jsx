import { createContext, useEffect, useState } from "react";
import axios from "axios";

// 1.create context
export const StoreContext = createContext(null);

// 2.create StoreContext Provider function
const StoreContextProvider = (props) => {
  // state for cart items
  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  // to fetch all the food lists data from database
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      // if cartItem(itemId) is not availabe
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // to get the total number of distnct products in the cart

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };

      if (updatedCartItems[itemId] > 1) {
        updatedCartItems[itemId] -= 1;
      } else {
        delete updatedCartItems[itemId];
      }

      return updatedCartItems;
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Get total distinct products in the cart
  const getTotalProducts = () => {
    return Object.keys(cartItems).reduce(
      (total, itemId) => total + cartItems[itemId],
      0
    );
  };
  // fetch food list

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response?.data?.data);
  };

  // to load/fetch the cart data from database

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  //3.create 1 variable
  const contextValue = {
    // whatever the element we will add  here we can access it in all the components.
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalProducts,
    url,
    token,
    setToken,
    setFoodList,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
