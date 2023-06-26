import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Price from "./PriceModel.js";

const { DataTypes } = Sequelize;

const Payment = db.define(
    "Payment", {
        pembayaranId: DataTypes.STRING,
        bulan: DataTypes.STRING,
        tahun: DataTypes.STRING,
        pemakaianAir: DataTypes.STRING,
        kategoriAir: DataTypes.STRING,
        air: DataTypes.STRING,
        keamanan: DataTypes.STRING,
        kebersihan: DataTypes.STRING,
        image: DataTypes.STRING,
        url: DataTypes.STRING,
        denda: DataTypes.STRING,
        dendaKebersihan: DataTypes.STRING,
        total: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);
Users.hasMany(Payment);
Payment.belongsTo(Users, { foreignKey: "userId" });

export default Payment;