const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/";

// Use async/await to connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;