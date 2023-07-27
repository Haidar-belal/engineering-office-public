'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Material, {
        foreignKey: {
          name: 'category_id',
          allowNull: true
        },
        as: "materials",
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Category, {
        foreignKey: {
          name: 'parent_category_id',
          allowNull: true,
          defaultValue: null
        },
        as: "categorys",
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'parent_category_id',
          allowNull: true,
          defaultValue: null
        },
        as: "category"
      });
    }
  }
  Category.init({
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    root_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    evaluation_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    // tableName: 'categories',
    // schema: 'engineering_office_public'
  });
  return Category;
};