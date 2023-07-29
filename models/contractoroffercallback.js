'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractorOfferCallback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OfficeOfferCategory, {
        foreignKey: {
          name: 'office_offer_category_id',
          allowNull: true
        },
        as: "officeoffercategory"
      });
    }
  }
  ContractorOfferCallback.init({
    Contractor_Offer_Callbacky_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    contractor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE
    },
    // office_offer_category_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'ContractorOfferCallback',
  });
  return ContractorOfferCallback;
};