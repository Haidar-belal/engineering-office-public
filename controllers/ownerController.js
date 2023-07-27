const { Owner, Contractor, CopyProjectOwner, Office, CopyProject, CopyProjectDocument, Sequelize } = require('../models');
const axios = require('axios');


exports.ownerLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const owner = await Owner.findOne({
        where: {
            email: email
        }
    });
    if (!owner) {
        return res.status(401).json({ massage: "email not found" });
    } else {
        if (owner.password === password) {
            return res.status(200).json(owner);
        }
        return res.status(401).json({ massage: "password not correct" });
    }
};

exports.ownerSearch = async (req, res, next) => {
    const { name } = req.body;
    try {
        const owner = await Owner.findOne({
            where: {
                first_name: name
            }
        });
        if (!owner) {
            return res.status(401).json({ massage: 'not found' });
        } else {
            return res.status(200).json(owner);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeOwner = async (req, res, next) => {

    const {
        first_name,
        last_name,
        card_id,
        address,
        email,
        password,
        phone,
        lng,
        lat,
    } = req.body;
    try {
        const oldEmail = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (oldEmail) {
            return res.status(401).json({ message: 'this email is already exists' });
        }
        const owner = await Owner.create({
            first_name: first_name,
            last_name: last_name,
            card_id: card_id,
            address: address,
            email: email,
            password: password,
            phone: phone,
            location: {
                type: 'Point',
                coordinates: [lat, lng]
            }
        });
        return res.status(200).json(owner);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(401).json({ msg: error.errors.map(e => e.message) });
        }
        return res.status(500).json(error);
    }
};


exports.updateOwner = async (req, res, next) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        card_id,
        address,
        email,
        password,
        phone,
        lat,
        lng,
    } = req.body;
    try {
        const oldEmail = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (oldEmail) {
            return res.status(401).json({ message: 'this email is already exists' });
        }
        else {
            const owner = await Owner.update({
                first_name: first_name,
                last_name: last_name,
                card_id: card_id,
                address: address,
                email: email,
                password: password,
                phone: phone,
                location: {
                    type: 'Point',
                    coordinates: [lat, lng]
                }
            }, {
                where: {
                    owner_id: id
                }
            });
            return res.status(200).json({ msg: 'owner updated successfully!' });
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(401).json({ msg: error.errors.map(e => e.message) });
        }
        return res.status(500).json(error);
    }
};

exports.storeOwnerProject = async (req, res, next) => {

    const { new_owner_id, owner_id } = req.body;
    const { id } = req.params; //copy_project_id

    try {
        const projectOwner = await CopyProjectOwner.findOne({
            attributes: [
                "owner_id"
            ],
            where: {
                copy_project_id: id,
                owner_id: owner_id
            }
        });
        if (!projectOwner) {
            return res.status(403).json({ message: "this project not for you" });
        }
        else {
            const project = await CopyProjectOwner.findOne({
                attributes: [
                    "owner_id"
                ],
                where: {
                    copy_project_id: id,
                    owner_id: new_owner_id
                }
            });
            if (!project) {
                const owner = await CopyProjectOwner.create({
                    owner_id: new_owner_id,
                    copy_project_id: id
                });
                return res.status(201).json(owner)
            }
            return res.status(401).json({ msg: "this user is already exists in your project!" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllOfficesOfOneOwner = async (req, res, next) => {

    const { id } = req.params; // owner_id

    try {
        const offices = await Office.findAll({
            include: {
                required: true,
                model: CopyProject,
                as: "copy_projects",
                include: {
                    model: Owner,
                    where: {
                        owner_id: id
                    },
                    attributes: [],
                    through: {
                        attributes: [],
                    }
                },
            },
        });
        return res.status(200).json(offices);
    } catch (error) {
        return res.status(500).json(error);
    }
};


exports.getOwnerProjectInfo = async (req, res, next) => {
    const { owner_id, office_id } = req.params;
    try {
        const office = await Office.findOne({
            where: {
                office_id: office_id,
            }
        });
        const { data } = await axios.post(`http://${office.host}/owner/projects-info/${id}`, {
            owner_id: owner_id
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// exports.getAllProjectsForOneOwner = async (req, res, next) => {

//     const {id} = req.params; //owner_id
//     try {
//         const projectIds = await CopyProjectOwner.findAll({
//             where: {
//                 owner_id: id
//             }
//         });
//         for (let index = 0; index < projectIds.length; index++) {
//             ids.push(projectIds[index].project_id);
//         }
//         const projects = await CopyProject.findAll({
//             where: {
//                 project_id: {
//                     [Op.in]: ids
//                 }
//             },
//             include: {
//                 model: CopyProjectDocument,
//                 as: "projectdocuments"
//             },
//         });
//         return res.status(200).json(projects);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

exports.storeProject = async (req, res, next) => {

    const { lat, lng, name, comment, office_id, owner_id } = req.body;

    try {
        const owner = await Owner.findOne({
            where: {
                owner_id: owner_id
            }
        });
        const newProject = await CopyProject.create({
            location: {
                type: 'Point',
                coordinates: [lat, lng]
            },
            name: name,
            comment: comment,
            office_id: office_id,
        });
        const copyProjectOwner = await owner.addCopyProject(newProject);
        return res.status(200).json({ message: "project added successfully", data: copyProjectOwner });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeProjectDocument = async (req, res, next) => {
    const { path } = req.file;
    const { title, project_id } = req.body;
    try {
        const projectDocument = await CopyProjectDocument.create({
            copy_project_id: project_id,
            document: path,
            title: title
        });
        return res.status(200).json(projectDocument);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllOffices = async (req, res, next) => {

    try {
        const offices = await Office.findAll();
        return res.status(200).json(offices);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.closerContractors = async (req, res, next) => {
    const { owner_id } = req.body;
    try {
        const owner = await Owner.findOne({
            where: {
                owner_id: owner_id
            }
        })
        const contractors = await Contractor.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), Sequelize.fn('ST_GeomFromText', `POINT(${owner.location.coordinates[0]} ${owner.location.coordinates[1]})`)),
                        'distance'
                    ]
            ]},
            order: [[Sequelize.literal('distance'), 'ASC']]
        });
        return res.status(200).json(contractors);
    } catch (error) {
        return res.status(500).json(error);
    }
};
