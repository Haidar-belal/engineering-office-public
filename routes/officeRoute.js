const express = require('express');

const router = express.Router();

const officeController = require('../controllers/officeController');

router.post('/office/store', officeController.storeOffice);

router.get('/offices', officeController.getAllOffice);

module.exports = router;