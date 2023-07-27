'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CopyProjectOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CopyProjectOwner.init({
    copy_project_owner_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    owner_id: DataTypes.INTEGER,
    copy_project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CopyProjectOwner',
    // tableName: 'copy_project_owners',
    // schema: 'engineering_office_public'
  });
  return CopyProjectOwner;
};