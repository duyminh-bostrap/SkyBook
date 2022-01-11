const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    genre: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://i.imgur.com/NVRNzyf.jpg',
    },
    price: {
      type: Number,
    },
    des: {
      type: String,
    },
    authorId: {
      type: String,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

module.exports = mongoose.model("books", BookSchema);
