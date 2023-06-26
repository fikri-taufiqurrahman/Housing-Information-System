import { Sequelize } from "sequelize";
const db = new Sequelize("housing_information_system", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
