const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://root:password@localhost:27017/reserve";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
