const express = require('express');
const multer = require('multer');

const router = express.Router();

const commentController = require('../controllers/commnetController');

const validation = require('../validation/commentValidation');

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

router.get('/comments/:id', commentController.getCommentForOneMaterial);

router.post('/comments/store',upload.single('image'), validation.storeComment, commentController.storeComment);

router.put('/comments/edit/:id', upload.single('image'), validation.updateComment, commentController.updateComment);

router.delete('/comments/delete/:id', commentController.deleteComment);


module.exports = router;