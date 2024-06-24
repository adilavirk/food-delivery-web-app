import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    // Attempt to connect to the database

    const connection = mongoose.connection;

    // Set up event listeners
    connection.on("connected", () => {
      console.log("MongoDB connected!");
    });
    connection.on("error", (error) => {
      console.log(
        "MongDB connection error, please make sure db is up and running:" +
          error
      );
      if (error) {
        // process.exit is a Node.js method used to terminate the process.
        // An exit code of 1 typically indicates that the process ended due to an error.
        process.exit(1);
      } else {
        // An exit code of 0 usually means that the process completed successfully without errors.
        process.exit(0);
      }
    });
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Something went wrong in connecting to DB");
    process.exit(1);
  }
};
