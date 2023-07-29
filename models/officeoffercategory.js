'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficeOfferCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OfficeOffer, {
        foreignKey: {
          name: 'office_offer_id', 
          allowNull: true
        },
        as: "officeoffer"
      });
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id', 
          allowNull: true
        },
        as: "category"
      });
    }
  }
  OfficeOfferCategory.init({
    office_offer_category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'OfficeOfferCategory',
  });
  return OfficeOfferCategory;
};