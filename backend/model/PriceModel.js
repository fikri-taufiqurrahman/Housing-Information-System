import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Payment from "./PaymentModel.js";

const { DataTypes } = Sequelize;

const Price = db.define(
  "price",
  {
    hargaKeamanan: DataTypes.STRING,
    hargaKebersihan: DataTypes.STRING,
    iuran: DataTypes.STRING,
    ppn: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Price.hasMany(Payment);
Payment.belongsTo(Price, { foreignKey: "priceId" });

export default Price;
