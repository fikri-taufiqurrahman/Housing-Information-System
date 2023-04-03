import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Price = db.define(
  "price",
  {
    hargaAir: DataTypes.STRING,
    hargaKeamanan: DataTypes.STRING,
    hargaKebersihan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Price;
