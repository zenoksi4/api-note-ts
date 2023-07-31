"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatuses_1 = require("../helpers/HttpStatuses");
const DBNotes_1 = require("../repositories/DBNotes");
const DeleteNote_1 = require("../repositories/DeleteNote");
const UpdateNote_1 = require("../repositories/UpdateNote");
const AddNote_1 = require("../repositories/AddNote");
const readAllNotes = (req, res) => {
    res
        .status(HttpStatuses_1.HTTP_STATUSES.OK_200)
        .json(DBNotes_1.db.notes);
};
const readNotesStats = (req, res) => {
    res
        .status(HttpStatuses_1.HTTP_STATUSES.OK_200)
        .json(DBNotes_1.db.notes);
};
const readNote = (req, res) => {
    const foundNotes = DBNotes_1.db.notes.find(c => c.id === req.params.id);
    if (!foundNotes) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res
        .status(HttpStatuses_1.HTTP_STATUSES.OK_200)
        .json(foundNotes);
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
    res
        .status(HttpStatuses_1.HTTP_STATUSES.CREATED_201)
        .json((0, AddNote_1.AddNote)(req.body));
};
const deleteNote = (req, res) => {
    (0, DeleteNote_1.DeleteNote)(req.params.id);
    res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NO_CONTENT_204);
};
const updateNote = (req, res) => {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    let updateNote = (0, UpdateNote_1.UpdateNote)(req.body, req.params.id);
    let status = HttpStatuses_1.HTTP_STATUSES.ACCEPTED_202;
    if (typeof updateNote === "number") {
        status = updateNote;
        updateNote = {};
    }
    res.status(status).json(updateNote);
};
exports.default = { readAllNotes, readNotesStats, readNote, createNote, deleteNote, updateNote };
