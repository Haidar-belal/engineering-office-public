const { Owner } = require('../models');

const isOwner = async (req, res, next) => {
    const owner = await Owner.findOne({
        where: {
            email: req.user.email,
            owner_id: req.user.id
        }
    });
    if (!owner) {
        return res.status(403).json({ message: 'You do not have permission to access this resource.' })
    }
    console.log(owner);
    next();
};

module.exports = isOwner;