import { Sequelize } from "sequelize";
const db = new Sequelize("project_uas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
