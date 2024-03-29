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
exports.DeleteNote = void 0;
const HttpStatuses_1 = require("../helpers/HttpStatuses");
const TaskModel_1 = require("../helpers/models/TaskModel");
const DeleteNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield TaskModel_1.Note.findByPk(id);
    if (note) {
        yield note.destroy();
        return HttpStatuses_1.HTTP_STATUSES.NO_CONTENT_204;
    }
    else {
        return HttpStatuses_1.HTTP_STATUSES.NOT_FOUND_404;
    }
});
exports.DeleteNote = DeleteNote;
