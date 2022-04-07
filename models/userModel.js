const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,

  },
  role: {
    type: String,
    default: "user"
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
