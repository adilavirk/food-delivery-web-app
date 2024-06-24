import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // if password is matching we will generate one token

    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "User logged In successfully", token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking is user already exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password using bcrypt

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // save new user in database

    const user = await newUser.save();

    const token = createToken(user._id);
    res.status(200).json({
      message: "User registered successfully",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { loginUser, registerUser };
