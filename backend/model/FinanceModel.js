import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Finance = db.define(
    "finance", {
        saldo: DataTypes.STRING,
        pemasukan: DataTypes.STRING,
        tanggal: DataTypes.STRING,
        bulan: DataTypes.STRING,
        tahun: DataTypes.STRING,
        pengeluaran: DataTypes.STRING,
        keterangan: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);


export default Finance;