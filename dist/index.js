"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotesRout_1 = __importDefault(require("./routes/NotesRout"));
const index_1 = require("./helpers/models/index");
const router = (0, express_1.default)();
const port = process.env.PORT || 5000;
const jsonBodyMiddleware = express_1.default.json();
router.use(jsonBodyMiddleware);
const db = new index_1.Database();
router.use("/notes", NotesRout_1.default);
db.connect()
    .then(() => {
    db.addModels();
})
    .then(() => {
    router.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
