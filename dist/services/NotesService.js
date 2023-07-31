"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatuses_1 = require("../helpers/HttpStatuses");
const DBNotes_1 = require("../repositories/DBNotes");
const readAllNotes = (req, res) => {
    res.json(DBNotes_1.db.notes);
};
const readNotesStats = (req, res) => {
    res.json(DBNotes_1.db.notes);
};
const readNote = (req, res) => {
    const foundNotes = DBNotes_1.db.notes.find(c => c.id === req.params.id);
    if (!foundNotes) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundNotes);
};
const createNote = (req, res) => {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    if (!(typeof (req.body.title) == 'string')) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const newNote = {
        id: Math.random().toString(),
        title: req.body.title,
        created: new Date().toLocaleDateString('uk'),
        category: req.body.category,
        content: req.body.content,
    };
    DBNotes_1.db.notes.push(newNote);
    res
        .status(HttpStatuses_1.HTTP_STATUSES.CREATED_201)
        .json(newNote);
};
const deleteNote = (req, res) => {
    DBNotes_1.db.notes = DBNotes_1.db.notes.filter(c => c.id !== req.params.id);
    res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NO_CONTENT_204);
};
const updateNote = (req, res) => {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const foundNotes = DBNotes_1.db.notes.find(c => c.id === req.params.id);
    if (!foundNotes) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if (req.body.title) {
        foundNotes.title = req.body.title;
    }
    if (req.body.category) {
        foundNotes.category = req.body.category;
    }
    if (req.body.content) {
        foundNotes.content = req.body.content;
    }
    res.sendStatus(HttpStatuses_1.HTTP_STATUSES.CREATED_201)
        .json(foundNotes);
};
exports.default = { readAllNotes, readNotesStats, readNote, createNote, deleteNote, updateNote };
