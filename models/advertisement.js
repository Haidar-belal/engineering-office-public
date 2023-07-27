'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {

    static associate(models) {
      this.belongsTo(models.Contractor, {
        foreignKey: 'contractor_id',
        as: 'contractor'
      });
    }

  }
  Advertisement.init({
    advertisement_id: {
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
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  return Advertisement;
};