"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNote = void 0;
const DBNotes_1 = require("./DBNotes");
const DeleteNote = (id) => {
    DBNotes_1.db.notes = DBNotes_1.db.notes.filter(c => c.id !== id);
};
exports.DeleteNote = DeleteNote;
