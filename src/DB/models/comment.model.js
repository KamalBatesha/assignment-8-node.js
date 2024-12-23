import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import postModel from "./post.model.js";
import userModel from "./user.model.js";

const commentModel = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: postModel,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: userModel,
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  });
  export default commentModel;