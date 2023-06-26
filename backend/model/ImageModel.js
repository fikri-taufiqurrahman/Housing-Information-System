import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Finance from "./FinanceModel.js";

const { DataTypes } = Sequelize;

const Images = db.define(
    "images", {
        image: DataTypes.STRING,
        url: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);
Finance.hasMany(Images);
Images.belongsTo(Finance, { foreignKey: "financeId" });

export default Images;