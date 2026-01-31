require("dotenv").config();
const mongoose = require("mongoose");

const deleteUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await mongoose.connection.db.collection("users").drop();
    console.log("Users collection deleted successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    if (error.message.includes("ns not found")) {
      console.log("Users collection doesn't exist (nothing to delete)");
    } else {
      console.error("Error:", error.message);
    }
    process.exit(0);
  }
};

deleteUsers();

// run with node delete-users.js
