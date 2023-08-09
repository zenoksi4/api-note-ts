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
const HttpStatuses_1 = require("../helpers/HttpStatuses");
const DeleteNote_1 = require("../repositories/DeleteNote");
const UpdateNote_1 = require("../repositories/UpdateNote");
const AddNote_1 = require("../repositories/AddNote");
const ReadAllNotes_1 = require("../repositories/ReadAllNotes");
const ReadNote_1 = require("../repositories/ReadNote");
const readNotesStats_1 = require("../repositories/readNotesStats");
const readAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, ReadAllNotes_1.ReadAllNotes)();
    res.status(HttpStatuses_1.HTTP_STATUSES.OK_200).json(notes);
});
const readNotesStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield (0, readNotesStats_1.ReadNoteStats)();
    res.status(HttpStatuses_1.HTTP_STATUSES.OK_200).json({ summary: stats });
});
const readNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const foundNotes = yield (0, ReadNote_1.ReadNote)(id);
    if (!foundNotes) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HttpStatuses_1.HTTP_STATUSES.OK_200).json(foundNotes);
});
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdNote = yield (0, AddNote_1.AddNote)(req.body);
    res.status(HttpStatuses_1.HTTP_STATUSES.CREATED_201).json(createdNote);
});
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield (0, DeleteNote_1.DeleteNote)(req.params.id);
    res.sendStatus(status);
});
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const { title, category, content } = req.body;
        let status = HttpStatuses_1.HTTP_STATUSES.ACCEPTED_202;
        const updatedData = {};
        if (title !== undefined)
            updatedData["title"] = title;
        if (category !== undefined)
            updatedData["category"] = category;
        if (content !== undefined)
            updatedData["content"] = content;
        if (!title && !category && !content) {
            status = HttpStatuses_1.HTTP_STATUSES.BAD_REQUEST_400;
            res.sendStatus(status).json({ message: "No data to update" });
            return;
        }
        let updateNote = yield (0, UpdateNote_1.UpdateNote)(updatedData, noteId);
        if (!updateNote) {
            status = HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404;
        }
        res.status(status).json(updateNote || { message: "NOT FOUND" });
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = {
    readAllNotes,
    readNotesStats,
    readNote,
    createNote,
    deleteNote,
    updateNote,
};
