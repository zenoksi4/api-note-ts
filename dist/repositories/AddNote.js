"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNote = void 0;
const DBNotes_1 = require("./DBNotes");
const AddNote = (addNote) => {
    const newNote = {
        id: Math.random().toString(),
        title: addNote.title,
        created: new Date().toLocaleDateString('uk'),
        category: addNote.category,
        content: addNote.content,
    };
    DBNotes_1.db.notes.push(newNote);
    return newNote;
};
exports.AddNote = AddNote;
