import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const userModel = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false

    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  }, {
    paranoid: true,
    validate: {
      checkPasswordLength() {
        if (this.password.split("").length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
      },
      checkNameLength() {
        if (this.name.split("").length < 3) {
          throw new Error('Name must be at least 3 characters long');
        }
      }
    }
  });
  export default userModel;