const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }] // Assuming 'Listing' is the name of your listing model
});

module.exports = mongoose.model('Categories', categorySchema);
