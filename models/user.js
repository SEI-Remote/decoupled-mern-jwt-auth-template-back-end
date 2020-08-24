const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    alias: String,
    email: String,
    avatar: String,
    googleId: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
