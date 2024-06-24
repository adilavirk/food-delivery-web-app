import userModel from "../models/userModel.js";

// 1.add items to user cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    // update the user cart with this new cart data in database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while adding item in the cart",
    });
  }
};

// 2.remove items from user cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    // If the quantity becomes 0, you might want to remove the item from the cart completely
    if (cartData[req.body.itemId] === 0) {
      delete cartData[req.body.itemId];
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while removing the cart item.",
    });
  }
};

// fetch user cart data from database

const getCartData = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while fetching the cart item.",
    });
  }
};

export { addToCart, removeFromCart, getCartData };
