import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Frilean from "./FrileanModel.js";

const { DataTypes } = Sequelize;
const Participan = db.define(
    "participan", {
        kehadiran: DataTypes.STRING,
    }, {
        freezeTableName: true,
    }
);


Users.hasMany(Participan);
Participan.belongsTo(Users, { foreignKey: "userId" });

Frilean.hasMany(Participan);
Participan.belongsTo(Frilean, { foreignKey: "frileanId" });

export default Participan;