const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    author: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    url: {
      type: String,
    },
    download_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
exports.User = mongoose.model("User", Schema);
