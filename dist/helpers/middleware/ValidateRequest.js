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
exports.SchemasUpdate = exports.SchemasCreate = exports.ValidateYup = void 0;
const yup_1 = require("yup");
const ValidateYup = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield schema.validate(req.body);
            console.log(data);
            res.locals.data = data;
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateYup = ValidateYup;
exports.SchemasCreate = {
    data: (0, yup_1.object)().shape({
        title: (0, yup_1.string)().required(),
        category: (0, yup_1.mixed)().oneOf(['Task', 'Idea', 'Random Thought']),
        content: (0, yup_1.string)().required(),
    })
};
exports.SchemasUpdate = {
    data: (0, yup_1.object)().shape({
        title: (0, yup_1.string)().optional(),
        category: (0, yup_1.mixed)().oneOf(['Task', 'Idea', 'Random Thought']).optional(),
        content: (0, yup_1.string)().optional(),
    })
};
