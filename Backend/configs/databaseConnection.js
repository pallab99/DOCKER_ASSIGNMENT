const mongoose = require("mongoose");

const connectDB = async (callback) => {
  try {
    const dbConnectionString = process.env.DB_CONNECTION_STRING;
    if (dbConnectionString) {
      const client = await mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Add this line
      });
      if (client) {
        console.log("Database connected successfully.By docker");
        callback();
      } else {
        console.log("Database url is not provided");
      }
    }
  } catch (error) {
    console.log("sssss error", error);
  }
};

module.exports = connectDB;
