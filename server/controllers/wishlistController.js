const Wishlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.params.userId }).populate('package');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    const existing = await Wishlist.findOne({ user: userId, package: packageId });
    if (existing) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    const item = await Wishlist.create({ user: userId, package: packageId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.body.userId, package: req.params.packageId });
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };