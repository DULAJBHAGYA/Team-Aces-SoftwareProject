const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("Database Connected!")
  } catch (err) {
    console.log("MongoDB Error: ", err);
  }
};

module.exports = connectDatabase;

