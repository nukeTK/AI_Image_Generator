import mongoose from "mongoose";

const connectdb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
  .connect(url)
    .then(() => console.log("MongoDB connected Now"))
    .catch((err) => console.log(err));
};

export default connectdb;