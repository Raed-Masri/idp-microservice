import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = "mongodb://localhost:27017/microservices";

    await mongoose.connect(uri, {});
    console.log("MongoDB connected to microservices");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
