const Booking = require('../models/Booking');

// Naya booking banana
const createBooking = async (req, res) => {
  try {
    const { userId, packageId, destination, price, duration } = req.body;

    const booking = await Booking.create({
      user: userId,
      package: packageId,
      destination,
      price,
      duration
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ek user ki saari bookings laana
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getUserBookings };