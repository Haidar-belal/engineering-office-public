const express = require('express');

const router = express.Router();

const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/owner/projectDocuments');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const ownerUpload = multer({ storage: fileStorage, fileFilter: fileFilter });

const ownerController = require('../controllers/ownerController');

router.post('/owner-login', ownerController.ownerLogin);

router.post('/owner/search', ownerController.ownerSearch);

router.post('/owner/store', ownerController.storeOwner);

router.put('/owner/edit/:id', ownerController.updateOwner);

router.post('/owner-project/store/:id', ownerController.storeOwnerProject);

router.get('/owner/offices/:id', ownerController.getAllOfficesOfOneOwner);

router.get('/owner/projects-info/:owner_id/:office_id', ownerController.getOwnerProjectInfo); // TODO test

// router.get('/owner/projects/:id', ownerController.getAllProjectsForOneOwner); // TODO override

router.post('/copy-project/store', ownerController.storeProject);

router.post('/copy-project/document/store', ownerUpload.single('pdf'), ownerController.storeProjectDocument);

router.get('/offices', ownerController.getAllOffices);

router.get('/closer-contractors', ownerController.closerContractors);

module.exports = router