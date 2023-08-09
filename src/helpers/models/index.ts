import { Sequelize } from "sequelize-typescript";
import { Note } from "./TaskModel";

export class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: "postgres",
      username: "admin",
      password: "root",
      host: "localhost",
      port: 5432,
      dialect: "postgres",
      models: [Note],
    });
  }

  public async close() {
    await this.sequelize.close();
  }

  public async addModels() {
    this.sequelize.addModels([Note]);
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({
        force: true,
      });
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public async getColumnsCount(tableName: string): Promise<number> {
    const tableDetails = await this.sequelize
      .getQueryInterface()
      .describeTable(tableName);
    const columnsCount = Object.keys(tableDetails).length;
    return columnsCount;
  }
}
