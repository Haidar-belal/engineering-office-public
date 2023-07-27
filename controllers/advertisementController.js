const { Advertisement } = require('../models');
const fs = require('fs');
const axios = require('axios');

exports.getAllAdvertisements = async (req, res, next) => {
    try {
        const advertisements = await Advertisement.findAll();
        return res.status(200).json(advertisements);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneAdvertisement = async (req, res, next) => {
    const { id } = req.params; //advertisement_id
    try {
        const advertisement = await Advertisement.findOne({
            where: {
                advertisement_id: id
            }
        });
        return res.status(200).json(advertisement);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeAdvertisement = async (req, res, next) => {
    const { contractor_id } = req.body;
    const { path } = req.file;
    try {
        const advertisement = await Advertisement.create({
            image: path,
            status: 0,
            contractor_id: contractor_id,
        });
        return res.status(200).json(advertisement);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateAdvertisement = async (req, res, next) => {
    const { contractor_id } = req.body;
    const { id } = req.params; //advertisement_id
    const { path } = req.file;
    try {
        const advertisement = await Advertisement.findOne({
            where: {
                advertisement_id: id
            }
        });
        if (advertisement.contractor_id != contractor_id) {
            return res.status(403).json({message: "this advertisement not for you"})
        }
        fs.unlinkSync(advertisement.image);
        advertisement.image = path;
        await advertisement.save();
        return res.status(200).json(advertisement);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
exports.changeAdvertisementStatus = async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params; //advertisement_id
    try {
        const advertisement = await Advertisement.update({
            status: status,
        },{
            where: {
                advertisement_id: id
            }
        });
        return res.status(200).json({message: "advertisement updated successfully"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.deleteAdvertisement = async (req, res, next) => {
    let { id } = req.params;
    try {
        const advertisement = await Advertisement.findByPk(id);
            await advertisement.destroy();
            return res.status(200).json({massage: 'advertisement deleted sucessfully'});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};