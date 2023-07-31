"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNote = void 0;
const HttpStatuses_1 = require("../helpers/HttpStatuses");
const DBNotes_1 = require("./DBNotes");
const UpdateNote = (updateData, id) => {
    const foundNotes = DBNotes_1.db.notes.find(c => c.id === id);
    if (!foundNotes) {
        return HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404;
    }
    if (updateData.title) {
        foundNotes.title = updateData.title;
    }
    if (updateData.category) {
        foundNotes.category = updateData.category;
    }
    if (updateData.content) {
        foundNotes.content = updateData.content;
    }
    return foundNotes;
};
exports.UpdateNote = UpdateNote;
