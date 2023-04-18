const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  zip: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  headcount: {
    type: Number,
    required: true,
    min: 1
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

