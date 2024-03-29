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
exports.UpdateNote = void 0;
const TaskModel_1 = require("../helpers/models/TaskModel");
const UpdateNote = (updateData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield TaskModel_1.Note.findByPk(id);
    if (note) {
        return yield note.update(updateData);
    }
    else {
        return null;
    }
});
exports.UpdateNote = UpdateNote;
