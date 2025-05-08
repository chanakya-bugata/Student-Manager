const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // Store the filename of the uploaded image
    required: true,
  },
  registrationNo: {
    type: String, // Add registration number as a string
    required: true, // Make it required for each member
    unique: true, // Ensure registration number is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Member', memberSchema);
