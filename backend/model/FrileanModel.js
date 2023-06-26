import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Frilean = db.define(
    "frilean", {
        jam: DataTypes.STRING,
        waktu: DataTypes.STRING,
        lokasi: DataTypes.STRING,
        deskripsi: DataTypes.STRING,
        denda: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
)


export default Frilean;