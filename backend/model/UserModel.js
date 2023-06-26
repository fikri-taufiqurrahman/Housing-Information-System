import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Users = db.define(
    "users", {
        role: DataTypes.STRING,
        name: DataTypes.STRING,
        nik: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gender: DataTypes.STRING,
        telepon: DataTypes.STRING,
        no_rumah: DataTypes.STRING,
        statusPemasanganAir: DataTypes.STRING,
        waterInstallationId: DataTypes.STRING,
        refresh_token: DataTypes.TEXT,
    }, {
        freezeTableName: true,
    }
);
export default Users;