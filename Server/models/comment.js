const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    },
    comment: {
      type: String,
    },
    danhgia: {
      type: Number,
      default: 5,
    },
    bookId: {
      type: String,
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentSchema);
