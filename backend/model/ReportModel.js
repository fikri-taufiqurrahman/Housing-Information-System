import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Reports = db.define(
  "report",
  {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    feedback: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Users.hasMany(Reports);
Reports.belongsTo(Users, { foreignKey: "userId" });

export default Reports;
