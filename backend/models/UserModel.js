import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Users = db.define(
  "users",
  {
    name: DataTypes.STRING,
    nik: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    telepon: DataTypes.STRING,
    no_rumah: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    air: DataTypes.STRING,
    total: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default Users;
(async () => {
  await db.sync();
})();
