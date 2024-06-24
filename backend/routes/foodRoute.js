import express from "express";
import {
  addFoodItem,
  listFoods,
  deleteFoodItem,
  updateFoodItem,
} from "../controllers/foodController.js";
import multer from "multer";

// create express router

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`); //to make each file name unique we are using Date.now() method here.
  },
});

const upload = multer({
  storage: storage,
});

foodRouter.post("/add", upload.single("image"), addFoodItem);
foodRouter.get("/list", listFoods);
foodRouter.post("/remove", deleteFoodItem);
foodRouter.put("/update", upload.single("image"), updateFoodItem); // Apply multer middleware here

export default foodRouter;
