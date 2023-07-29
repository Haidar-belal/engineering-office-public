const { Comment } = require('../models');

exports.getCommentForOneMaterial = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comments = await Comment.findAll({
            where: {
                material_id: id
            }
        });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeComment = async (req, res, next) => {
    const { material_id } = req.body;
    const { id } = req.user;
    let path;
    if (req.file) {
        path  = req.file.path;
    }
    try {
        const comment = await Comment.create({
            text: req.body.text || null,
            owner_id: id,
            material_id: material_id,
            image: path || null
        });
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateComment = async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({message: 'comment not found'});
        }
        comment.text = text || null;
        if (req.file) {
            comment.image = req.file.path;
        }
        await comment.save();
        return res.status(201).json({message: 'comment updated successfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteComment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({message: 'comment not found'});
        }
        if (comment.owner_id != req.user.id) {
            return res.status(403).json({message: 'comment not to you'});
        }
        await comment.destroy();
        return res.status(201).json({message: 'comment deleted successfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
}; 