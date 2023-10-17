import mysql from "mysql2";
import { createTableMessages, createTableSessions } from "./createTables";

export class MysqlDatabase {
  connection;
  constructor() {
    this.connection = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: parseInt(process.env.MYSQLPORT as string),
    });
    this.createTablesIfNoExist();
  }
  createTablesIfNoExist() {
    createTableSessions(this.connection);
    createTableMessages(this.connection);
  }
  getInstanceDatabase() {
    return this.connection;
  }
}
