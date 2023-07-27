'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contractor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Material, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: true
        },
        as: 'materials'
      });
      this.hasMany(models.ContractorMainDocument, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: true
        },
        as: 'contractormaindocuments'
      });
      this.belongsToMany(models.CopyProject, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: true
        },
        through: models.CopyProjectContractor,
        onDelete: 'SET NULL'
      });
      this.hasMany(models.Advertisement, {
        foreignKey: 'contractor_id',
        as: 'advertisements'
      });
      this.hasMany(models.ContractorOffer, {
        foreignKey: {
          name: 'contractor_id',
          allowNull: false
        },
        as: "contractoroffers"
      });
    }
  }
  Contractor.init({
    contractor_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'phone number already in use!'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Contractor',
    // tableName: 'contractors',
    // schema: 'engineering_office_public',
    // freezeTableName: true
  });
  return Contractor;
};