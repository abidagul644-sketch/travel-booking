const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  destination: String,
  price: Number,
  duration: String,
  status: {
    type: String,
    default: 'Confirmed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);