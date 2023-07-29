const express = require('express');

const router = express.Router();

const officeController = require('../controllers/officeController');

router.post('/store', officeController.storeOffice);

router.get('/', officeController.getAllOffice);

module.exports = router;