import mongoose from "mongoose";

// One shared connection: serverless invocations reuse it while the instance is warm.
let connection;

const connectDB = () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set");
  connection ??= mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
    .then((m) => {
      console.log("MongoDB Connected");
      return m;
    })
    .catch((error) => {
      connection = undefined;
      throw error;
    });
  return connection;
};

export default connectDB;
