import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WaterInstallation = db.define(
  "waterInstallation",
  {
    kelompokPelanggan: DataTypes.STRING,
    diameterAir: DataTypes.STRING,
    biayaSambungan: DataTypes.STRING,
    biayaAdministrasi: DataTypes.STRING,
    UangJaminan: DataTypes.STRING,
    total: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default WaterInstallation;
