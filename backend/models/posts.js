const { Sequelize, DataTypes } = require('sequelize');

const PostModel = (db) => {
  const post = db.define('post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      }
    }, {
      tableName: 'posts',
      timestamps: false,
    }
  )
  return post;
}

module.exports = PostModel
