const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  notes: [
    {
      note: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;