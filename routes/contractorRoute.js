const express = require('express');
const multer = require('multer');

const router = express.Router();

const contractorController = require('../controllers/contractorController');

const validation = require('../validation/contractorValidation');

const fileStoragem = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/materials');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilterm = (req, file, cb) => {
        cb(null, true);
};


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf/contractor');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // new date().toISOString() + '-' + 
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const contractorUpload = multer({ storage: fileStoragem, fileFilter: fileFilterm });

router.post('/contractor-login', validation.contractorLogin, contractorController.contractorLogin);

router.get('/contractors', contractorController.getAllContractors);

router.post('/contractor/material/store', validation.storeMaterial, contractorUpload.single('image'), contractorController.storeMarerial);

router.put('/contractor/material/edit/:id',  validation.upateMaterial, contractorUpload.single('image'), contractorController.updateMarerial);

router.delete('/contractor/material/delete/:id', contractorController.deleteMarerial);

router.post('/contractor/store', validation.storeContractor, contractorController.storeContractor);

router.post('/category/store', contractorUpload.single('image'), contractorController.storeCategory);

router.post('/contractor-main-document/store', upload.single('pdf'), contractorController.contractorMainDocumentStore);

router.get('/contractor/office', contractorController.getAllOfficeContractor);

router.get('/contractor/office-projects/:id', contractorController.getAllProjectInOneOffice);

router.get('/contractor/stage-materials/:id', contractorController.getContractorMaterialFromOneStage);

module.exports = router




