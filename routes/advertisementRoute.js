const express = require('express');
const multer = require('multer');
const router = express.Router();

const advertisementController = require('../controllers/advertisementController');

const isAuth = require('../middleware/isAuthMiddleware');

const isContractor = require('../middleware/isContractorMiddleware');

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

router.put('/advertisement/change-status/:id', advertisementController.changeAdvertisementStatus);

router.use(isAuth, isContractor);

router.get('/', advertisementController.getAllAdvertisements);

router.get('/:id', advertisementController.getOneAdvertisement);

router.post('/store', advertisementUpload.single('image'), advertisementController.storeAdvertisement);

router.put('/edit/:id', advertisementUpload.single('image'), advertisementController.updateAdvertisement);

router.delete('/delete/:id', advertisementController.deleteAdvertisement);

module.exports = router




