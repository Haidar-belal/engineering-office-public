const axios = require('axios');
const { Office } = require('../models');
const { Op } = require("sequelize");

exports.storeOffice = async (req, res, next) => {
    const { name } = req.body;
    try {
        const office = await Office.create({
            name: name,
        });
        return res.status(200).json({massage: "office added sucessfully", office_id: office.office_id});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllOffice = async (req, res, next) => {
    try {
        const offices = await Office.findAll();
        return res.status(200).json(offices);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// exports.fetch = async (req, res, next) => {
//     try {
//         const data = await axios.get("https://finalspaceapi.com/api/v0/character/?limit=2", {
//             // responseType: "json",
//         });
//         return res.status(200).json(data.data);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };
