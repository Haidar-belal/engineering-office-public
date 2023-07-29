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

const isAuth = require('../middleware/isAuthMiddleware');

const isOwner = require('../middleware/isOwnerMiddleware');

router.post('/login', ownerController.ownerLogin);

router.post('/store', ownerController.storeOwner);

router.use(isAuth, isOwner);

router.post('/search', ownerController.ownerSearch);

router.put('/edit', ownerController.updateOwner);

router.post('/project/store/:id', ownerController.storeOwnerProject);

router.get('/offices', ownerController.getAllOfficesOfOneOwner);

router.get('/projects-info/:office_id', ownerController.getOwnerProjectInfo); // TODO test

// router.get('/owner/projects/:id', ownerController.getAllProjectsForOneOwner); // TODO override

router.post('/copy-project/store', ownerController.storeProject);

router.post('/copy-project/document/store', ownerUpload.single('pdf'), ownerController.storeProjectDocument);

router.get('/offices', ownerController.getAllOffices);

router.get('/closer-contractors', ownerController.closerContractors);

module.exports = router