"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const TaskModel_1 = require("./TaskModel");
class Database {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            database: "postgres",
            username: "admin",
            password: "root",
            host: "localhost",
            port: 5432,
            dialect: "postgres",
            models: [TaskModel_1.Note],
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.close();
        });
    }
    addModels() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize.addModels([TaskModel_1.Note]);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                yield this.sequelize.sync({
                    force: true,
                });
                console.log("Connection has been established successfully.");
            }
            catch (error) {
                console.error("Unable to connect to the database:", error);
            }
        });
    }
    getColumnsCount(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableDetails = yield this.sequelize
                .getQueryInterface()
                .describeTable(tableName);
            const columnsCount = Object.keys(tableDetails).length;
            return columnsCount;
        });
    }
}
exports.Database = Database;
