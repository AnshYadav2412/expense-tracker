import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("mongoose database connected");
  } catch (error) {
    console.error("Error while connecting to DB", error);
    process.exit(1);
  }
};

export default connectDb;
