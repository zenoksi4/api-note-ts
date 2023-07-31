"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const NotesService_1 = __importDefault(require("../services/NotesService"));
const ValidateRequest_1 = require("../helpers/middleware/ValidateRequest");
const router = express_1.default.Router();
router.get('/', NotesService_1.default.readAllNotes);
router.get('/stats', NotesService_1.default.readNotesStats);
router.get('/:id', NotesService_1.default.readNote);
router.post('/', (0, ValidateRequest_1.ValidateYup)(ValidateRequest_1.SchemasCreate.data), NotesService_1.default.createNote);
router.delete('/:id', NotesService_1.default.deleteNote);
router.patch('/:id', (0, ValidateRequest_1.ValidateYup)(ValidateRequest_1.SchemasUpdate.data), NotesService_1.default.updateNote);
module.exports = router;
