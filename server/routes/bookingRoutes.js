const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, cancelBooking, payForBooking, getBookingById, getAllBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/all', getAllBookings);
router.get('/single/:id', getBookingById);
router.get('/:userId', getUserBookings);
router.put('/cancel/:id', cancelBooking);
router.put('/pay/:id', payForBooking);

module.exports = router;