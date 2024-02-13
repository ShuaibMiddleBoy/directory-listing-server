const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Categories",
  },
  titleName: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Listing", listSchema);