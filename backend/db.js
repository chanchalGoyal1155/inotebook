const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to Mongo successfully");
    })
    .catch((error) => {
      console.error("Error connecting to Mongo:", error);
    });
};

module.exports = connectToMongo;
