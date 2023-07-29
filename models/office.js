'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Manager, {
      //   foreignKey: {
      //       name: 'office_id',
      //       allowNull: true
      //   },
      //   as: "managers"
      //   });
        this.hasMany(models.EvaluationEnginnerMaterial, {
          foreignKey: {
              name: 'office_id',
              allowNull: true
          },
          as: "evaluationenginnermaterials"
          });
        this.hasMany(models.OfficeOffer, {
          foreignKey: {
              name: 'office_id',
              allowNull: true
          },
          as: "officeoffers"
          });
        this.hasMany(models.CopyProject, {
          foreignKey: {
              name: 'office_id',
              allowNull: true
          },
          as: "copy_projects"
          });
    }
  }
  Office.init({
    office_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Office',
    // tableName: 'offices',
    // schema: 'engineering_office_public'
  });
  return Office;
};