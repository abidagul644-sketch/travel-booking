const Package = require('../models/Package');

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const { destination, description, price, duration, image } = req.body;
    const newPackage = await Package.create({ destination, description, price, duration, image });
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPackages, createPackage, getPackageById, deletePackage };