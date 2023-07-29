const { Contractor } = require('../models');

const isContractor = async (req, res, next) => {
    const contractor = await Contractor.findOne({
        where: {
            email: req.user.email,
            contractor_id: req.user.id
        }
    });
    if (!contractor) {
        return res.status(403).json({ message: 'You do not have permission to access this resource.' })
    }
    console.log(contractor);
    next();
};

module.exports = isContractor;