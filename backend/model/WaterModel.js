import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Water = db.define(
    "water", {
        kelompokPelanggan: DataTypes.STRING,
        jenisKelompokPelanggan: DataTypes.STRING,
        Tarif0to3: DataTypes.STRING,
        Tarif3to10: DataTypes.STRING,
        Tarif10to20: DataTypes.STRING,
        TarifAbove20: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);
Water.hasMany(Users);
Users.belongsTo(Water, { foreignKey: "waterId" });

export default Water;