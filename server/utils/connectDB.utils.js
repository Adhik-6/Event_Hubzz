import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log("connected to DB")
  } catch (err) {
    console.log("Error while connecting to DB :", err.message)
  }
}