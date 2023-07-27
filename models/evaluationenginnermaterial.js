'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class EvaluationEnginnerMaterial extends Model {
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
    as: "material"
    });
    // this.belongsTo(models.Engineer, {
    // foreignKey: {
    //     name: 'engineer_id',
    //     allowNull: true
    // },
    // as: "engineer"
    // });
    this.belongsTo(models.Office, {
    foreignKey: {
        name: 'office_id',
        allowNull: true
    },
    as: "office"
    });
}
}
EvaluationEnginnerMaterial.init({
    evaluation_enginner_material_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    engineer_id: {
        type: DataTypes.INTEGER,
    },
}, {
sequelize,
modelName: 'EvaluationEnginnerMaterial',
// tableName: 'evaluation_enginner_materials',
// schema: 'engineering_office_public'
});
return EvaluationEnginnerMaterial;
};