'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CopyProjectDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CopyProject, {
        foreignKey: {
          name: 'copy_project_id',
          allowNull: true
        },
        as: "project"
      });
    }
  }
  CopyProjectDocument.init({
    copy_project_document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    title: DataTypes.STRING,
    document: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CopyProjectDocument',
    // tableName: 'copy_project_documents',
    // schema: 'engineering_office_public'
  });
  return CopyProjectDocument;
};