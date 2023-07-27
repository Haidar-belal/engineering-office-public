'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CopyProjectContractor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CopyProjectContractor.init({
    copy_project_contractor_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    contractor_id: DataTypes.INTEGER,
    copy_project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CopyProjectContractor',
  });
  return CopyProjectContractor;
};