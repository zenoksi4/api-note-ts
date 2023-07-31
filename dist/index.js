"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotesRout_1 = __importDefault(require("./routes/NotesRout"));
const router = (0, express_1.default)();
const port = process.env.PORT || 5000;
const jsonBodyMiddleware = express_1.default.json();
router.use(jsonBodyMiddleware);
router.use('/notes', NotesRout_1.default);
router.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
