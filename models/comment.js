'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Material, {
        foreignKey: "material_id",
        as: "material"
      });
      this.belongsTo(models.Owner, {
        foreignKey: "owner_id",
        as: "owner"
      });
    }
  }
  Comment.init({
    comment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    image:  {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};