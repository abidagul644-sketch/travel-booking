const Package = require('../models/Package');

// Sab packages laana
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Naya package add karna
const createPackage = async (req, res) => {
  try {
    const { destination, description, price, duration, image } = req.body;
    const newPackage = await Package.create({ destination, description, price, duration, image });
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPackages, createPackage };