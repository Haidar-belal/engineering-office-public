'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractorOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Contractor, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: false
        },
        as: "contractor"
      });
    }
  }
  ContractorOffer.init({
    Contractor_Offer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: null
    }
  },{
    sequelize,
    modelName: 'ContractorOffer',
  });
  return ContractorOffer;
};