const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
    },
    role: {
      type: Number,
      default: 0,
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
