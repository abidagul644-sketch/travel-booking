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
  travelDate: String,
  travelers: Number,
  status: {
    type: String,
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    default: 'Unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);