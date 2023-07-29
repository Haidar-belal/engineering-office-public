'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.EvaluationOwnerMaterial, {
        foreignKey: {
          name: 'material_id',
          allowNull: true
        },
        as: "evaluationownermaterials"
      });
      this.hasMany(models.EvaluationEnginnerMaterial, {
        foreignKey: {
          name: 'material_id',
          allowNull: true
        },
        as: "evaluationenginnermaterials"
      });
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id',
          allowNull: true
        },
        as: "category"
      });
      this.belongsTo(models.Contractor, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: true
        },
        as: "contractor"
      });
      this.hasMany(models.Comment, {
        foreignKey: "material_id",
        as: "comments"
      });
      // this.belongsToMany(models.Stage, {
      //   foreignKey: {
      //     name: 'material_id',
      //     allowNull: true
      //   },
      //   through: models.StageMaterial,
      //   onDelete: 'SET NULL'
      // });
    }
  }
  Material.init({
    material_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    sequelize,
    modelName: 'Material',
    // tableName: 'materials',
    // schema: 'engineering_office_public'
  });
  return Material;
};