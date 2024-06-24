import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

//1. add food item

const addFoodItem = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  //   create a new food using the food Model

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added Successfully.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while adding the food item",
      status: 500,
    });
  }
};

// 2.to get the list of all the food items stored in databse

const listFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while fetching the food Items",
    });
  }
};

// 3.delete food item
const deleteFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body._id);
    console.log(food);
    // to delte the image of the food

    fs.unlink(`uploads/${food.image}`, () => {});

    // to delete the product data from mongoDB database

    await foodModel.findByIdAndDelete(req.body._id);
    res.json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured while deleting the food Item",
    });
  }
};

// 4.update the food Item
const updateFoodItem = async (req, res) => {
  try {
    const { _id, name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // console.log(req.body); // Check other fields
    // console.log(req.file); // Check the uploaded file

    const food = await foodModel.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        _id,
        name,
        description,
        price,
        image,
      },
      { new: true }
    );

    // If there's a new image, handle the old image
    if (image) {
      // Delete the old image file
      fs.unlink(path.join("uploads", food.image), (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });

      // Update the food item with the new image
      food.image = image;
    }

    // Save the updated food

    const updatedFoodItem = await food.save();

    res.json({
      success: true,
      message: "Food item updated successfully",
      data: updatedFoodItem,
    });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating the food item",
    });
  }
};

export { addFoodItem, listFoods, deleteFoodItem, updateFoodItem };
