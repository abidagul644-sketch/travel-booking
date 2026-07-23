const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { userId, packageId, destination, price, duration } = req.body;
    const booking = await Booking.create({
      user: userId,
      package: packageId,
      destination,
      price,
      duration,
      status: 'Pending',
      paymentStatus: 'Unpaid'
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const payForBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'Paid', status: 'Confirmed' },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking, payForBooking, getBookingById };