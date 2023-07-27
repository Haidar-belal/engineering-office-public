'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.Project, {
      //   foreignKey: {
      //     name: 'owner_id',
      //     allowNull: true
      //   },
      //   through: models.ProjectOwner,
      //   onDelete: 'SET NULL'
      // });
      this.hasMany(models.EvaluationOwnerMaterial, {
        foreignKey: {
          name: 'owner_id',
          allowNull: true
        },
        as: 'EvaluationOwnerMaterials'
      });
      this.belongsToMany(models.CopyProject, {
        foreignKey: {
          name: 'owner_id',
          allowNull: true
        },
        through: models.CopyProjectOwner,
        onDelete: 'SET NULL'
      });
    }
  }
  Owner.init({
    owner_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'phone number already in use!'
      }
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Owner',
    // tableName: 'owners',
    // schema: 'engineering_office_public'
  });
  return Owner;
};