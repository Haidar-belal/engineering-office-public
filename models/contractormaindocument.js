'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class ContractorMainDocument extends Model {
/**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */
static associate(models) {
this.belongsTo(models.Contractor, {
    foreignKey: {
        name: 'contractor_id',
        allowNull: true
    },
    as: "contractor"
    });
}
}
ContractorMainDocument.init({
    Contractor_main_document_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
sequelize,
    modelName: 'ContractorMainDocument',
    // tableName: 'contractor_main_documents',
    // schema: 'engineering_office_public'
});
return ContractorMainDocument;
};