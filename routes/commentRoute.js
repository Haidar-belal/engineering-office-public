const express = require('express');
const multer = require('multer');

const router = express.Router();

const commentController = require('../controllers/commnetController');

const validation = require('../validation/commentValidation');

const isAuth = require('../middleware/isAuthMiddleware');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/comments');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.use(isAuth);

router.get('/:id', commentController.getCommentForOneMaterial);

router.post('/store',upload.single('image'), validation.storeComment, commentController.storeComment);

router.put('/edit/:id', upload.single('image'), validation.updateComment, commentController.updateComment);

router.delete('/delete/:id', commentController.deleteComment);


module.exports = router;