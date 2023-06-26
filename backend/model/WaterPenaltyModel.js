import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WaterPenalty = db.define(
    "waterPenalty", {
        kelompokPelanggan: DataTypes.STRING,
        denda: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);

export default WaterPenalty;