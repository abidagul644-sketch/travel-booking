const express = require('express');
const router = express.Router();
const { getPackages, createPackage, getPackageById, deletePackage } = require('../controllers/packageController');

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', createPackage);
router.delete('/:id', deletePackage);

module.exports = router;