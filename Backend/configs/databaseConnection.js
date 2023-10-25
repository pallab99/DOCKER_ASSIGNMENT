const mongoose = require("mongoose");

const connectDB = async (callback) => {
  try {
    const dbConnectionString =
      "mongodb://mongo-container-compose:27017/mid-term-project";
    console.log("connection string", dbConnectionString);
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
