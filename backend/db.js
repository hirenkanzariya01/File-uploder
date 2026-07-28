const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectdb;