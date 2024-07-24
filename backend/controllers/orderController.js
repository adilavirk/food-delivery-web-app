import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://food-delivery-web-app-frontend.vercel.app";

  console.log("Frontend URL:", frontend_url); // Log the frontend URL

  // Create new order
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save order in database
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100 * 279),
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 279,
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `https://food-delivery-web-app-frontend.vercel.app/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `https://food-delivery-web-app-frontend.vercel.app/verify?success=false&orderId=${newOrder._id}`,
      // success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      // cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Success URL:", session.success_url); // Log the success URL
    console.log("Cancel URL:", session.cancel_url); // Log the cancel URL

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while making the stripe payment.",
    });
  }
};

// Export functions
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
