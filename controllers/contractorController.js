const { Contractor, Owner, Material, Category, ContractorMainDocument, Office, CopyProject } = require('../models');
const axios = require('axios');

exports.contractorLogin = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const contractor = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (!contractor) {
            return res.status(401).json({massage: "email not found"});
        } else {
            if (contractor.password === password) {
                return res.status(200).json(contractor);
            }
            return res.status(401).json({massage: "password is invalid"});
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.getAllContractors = async (req, res, next) => {
    try {
        const contractors = await Contractor.findAll();
        return res.status(200).json(contractors);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeContractor = async (req, res, next) => {
    const { first_name,
        name, 
        last_name, 
        email, 
        password,   
        phone,
        address,
        lat,
        lng
    } = req.body;
    try {
        const owner = await Owner.findOne({
            where: {
                email: email
            }
        });
        if (owner) {
                return res.status(401).json({massage: 'this email is already exist'});
        }
        const contractor = await Contractor.create({
            first_name: first_name,
            last_name: last_name,
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: password,
            location: {
                type: 'Point',
                coordinates: [lat, lng]
            }
        });
        return res.status(200).json(contractor);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: error.errors.map(e => e.message)
            })
        } else {
            return res.status(500).json(error.message);
        }
    }
};

exports.storeMarerial = async (req, res, next) => {
    let { contractor_id, unit_price, name, qualification, category_id } = req.body;
    let { path } = req.file;
    try {
        const material = await Material.create({
            name: name,
            unit_price: unit_price,
            category_id: category_id,
            contractor_id: contractor_id,
            qualification: qualification,
            image: path,
        });
        return res.status(200).json(material);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateMarerial = async (req, res, next) => {
    let { id } = req.params;
    let { unit_price, name, qualification } = req.body;
    try {
        const material = await Material.findByPk(id);
            material.name = name;
            material.unit_price = unit_price;
            material.qualification = qualification;
            if (req.file) {
                material.image = req.file.path;
            }
            await material.save();
            return res.status(200).json({massage: 'material updated sucessfully'});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.deleteMarerial = async (req, res, next) => {
    let { id } = req.params;
    try {
        const material = await Material.findByPk(id);
            await material.destroy();
            return res.status(200).json({massage: 'material deleted sucessfully'});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.storeCategory = async (req, res, next) => {
    let { name, evaluation_type, parent_category_id } = req.body;
    let { path } = req.file;
    try {
        if (!parent_category_id) {
            const category = await Category.create({
                name: name,
                image: path,
                evaluation_type: evaluation_type,
            });
            return res.status(200).json(category);
        }
        const parentCategory = await Category.findOne({
            where: {
                parent_category_id: parent_category_id
            }
        });
        const category = await Category.create({
            name: name,
            image: path,
            evaluation_type: evaluation_type,
            parent_category_id: parent_category_id,
            root_id: parentCategory.root_id
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.contractorMainDocumentStore = async (req, res, next) => {
    const { contractor_id, comment } = req.body;
    const { path } = req.file;
    try {
        const contractorMainDocumect = await ContractorMainDocument.create({
            contractor_id: contractor_id,
            document: path,
            comment: comment
        })
        return res.status(200).json(contractorMainDocumect);
    } catch (error) {
        return res.status(200).json(error);
    }
};

exports.getAllOfficeContractor = async (req, res, next) => {
    const { contractor_id } = req.body;
    try {
        const office = await Office.findAll({
            include: {
                model: CopyProject,
                as: 'copy_projects',
                attributes: [],
                include: {
                    model: Contractor,
                    attributes: [],
                    through: {
                        attributes: [],
                        where: {
                            contractor_id: contractor_id
                        }
                    }
                } 
            }
        })
        return res.status(200).json(office);
    } catch (error) {
        return res.status(200).json(error.message);
    }
};
// fetch from anather app
exports.getAllProjectInOneOffice = async (req, res, next) => {
    const { id } = req.params;
    const { contractor_id } = req.body;
    try {
        const office = await Office.findOne({
            where: { office_id: id },
        });
        if (!office) {
            return res.status(404).json({message: 'office not found'})
        }
        const {data} = await axios.post(`http://${office.host}/contractor-projects`, {
            contractor_id: contractor_id
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getContractorMaterialFromOneStage = async (req, res, next) => {
    const { id } = req.params;
    const { contractor_id, office_id } = req.body;
    try {
        const office = await Office.findPyBk(office_id);
        const {data} = await axios.post(`https://${office.host}/contractor-materials/${id}`, {
        contractor_id: contractor_id,
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error);
    }
};