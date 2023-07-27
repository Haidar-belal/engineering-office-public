const express = require('express');
const multer = require('multer');
const router = express.Router();

const advertisementController = require('../controllers/advertisementController');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/advertisements');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};

const advertisementUpload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.get('/advertisements', advertisementController.getAllAdvertisements);

router.get('/advertisement/:id', advertisementController.getOneAdvertisement);

router.post('/advertisement/store', advertisementUpload.single('image'), advertisementController.storeAdvertisement);

router.put('/advertisement/edit/:id', advertisementUpload.single('image'), advertisementController.updateAdvertisement);

router.put('/advertisement/change-status/:id', advertisementController.changeAdvertisementStatus);

router.delete('/advertisement/delete/:id', advertisementController.deleteAdvertisement);

module.exports = router




