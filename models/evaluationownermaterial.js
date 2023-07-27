'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluationOwnerMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Material, {
        foreignKey: {
          name: 'material_id',
          allowNull: true
        },
        as: 'material'
      });
      this.belongsTo(models.Owner, {
        foreignKey: {
          name: 'owner_id',
          allowNull: true
        },
        as: 'owner'
      });
    }
  }
  EvaluationOwnerMaterial.init({
    evaluation_owner_material_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EvaluationOwnerMaterial',
    // tableName: 'evaluation_owner_materials',
    // schema: 'engineering_office_public'
  });
  return EvaluationOwnerMaterial;
};