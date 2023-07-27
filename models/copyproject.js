'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CopyProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CopyProjectDocument, {
        foreignKey: {
          name: 'copy_project_id',
          allowNull: true
        },
        as: "project_documents"
      });
      this.belongsToMany(models.Owner, {
        foreignKey: {
          name: 'copy_project_id',
          allowNull: true
        },
        through: models.CopyProjectOwner,
        onDelete: 'SET NULL'
      });
      this.belongsToMany(models.Contractor, {
        foreignKey: {
          name: 'copy_project_id',
          allowNull: true
        },
        through: models.CopyProjectContractor,
        onDelete: 'SET NULL'
      });
      this.belongsTo(models.Office, {
        foreignKey: {
            name: 'office_id',
            allowNull: true
        },
        as: "office"
        });
    }
  }
  CopyProject.init({
    copy_project_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    primary_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'CopyProject',
    // tableName: 'copy_projects',
    // schema: 'engineering_office_public'
  });
  return CopyProject;
};