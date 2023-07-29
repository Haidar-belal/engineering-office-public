const express = require('express');
const multer = require('multer');

const router = express.Router();

const contractorController = require('../controllers/contractorController');

const validation = require('../validation/contractorValidation');

const isAuth = require('../middleware/isAuthMiddleware');

const isContractor = require('../middleware/isContractorMiddleware');

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
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const contractorUpload = multer({ storage: fileStoragem, fileFilter: fileFilterm });

router.post('/login', validation.contractorLogin, contractorController.contractorLogin);

router.post('/store', validation.storeContractor, contractorController.storeContractor);

router.use(isAuth, isContractor);

router.get('/', contractorController.getAllContractors);

router.post('/material/store', validation.storeMaterial, contractorUpload.single('image'), contractorController.storeMarerial);

router.put('/material/edit/:id',  validation.upateMaterial, contractorUpload.single('image'), contractorController.updateMarerial);

router.delete('/material/delete/:id', contractorController.deleteMarerial);

router.post('/category/store', contractorUpload.single('image'), contractorController.storeCategory);

router.post('/main-document/store', upload.single('pdf'), contractorController.contractorMainDocumentStore);

router.get('/office', contractorController.getAllOfficeContractor);

router.get('/office-projects/:id', contractorController.getAllProjectInOneOffice);

router.get('/stage-materials/:id', contractorController.getContractorMaterialFromOneStage);

module.exports = router




