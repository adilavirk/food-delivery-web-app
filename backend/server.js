import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config

// 1.initialize app using express package
const app = express();
// 2.define the port where our srver will be running
const port = process.env.PORT || 4000;

// middleware

// 3.initailize middleware
app.use(express.json());

// 4.to access backend from any frontend we will use cors
app.use(cors());

// 7.db connection
connectDB();
//5. app.get() method is the http method,using this method we can request the data from the server
app.get("/", (req, res) => {
  res.send("API is working............");
});

// 8.Api endpoints

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// 6.Run the express server

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
