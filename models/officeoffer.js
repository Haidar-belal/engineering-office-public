'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficeOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ContractorOfferCallback, {
        foreignKey: {
          name: 'office_offer_category_id',
          allowNull: false
        },
        as: "contractoroffercallbacks"
      });
      this.hasMany(models.OfficeOfferCategory, {
        foreignKey: {
          name: 'office_offer_category_id',
          allowNull: false
        },
        as: "officeoffercategories"
      });
      this.belongsTo(models.Office, {
        foreignKey: {
          name: 'office_id', 
          allowNull: true
        },
        as: "office"
      });
      this.belongsTo(models.CopyProject, {
        foreignKey: {
          name: 'copy_project_id', 
          allowNull: true
        },
        as: "copyproject"
      });
    }
  }
  OfficeOffer.init({
    office_offer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },{
    sequelize,
    modelName: 'OfficeOffer',
  });
  return OfficeOffer;
};