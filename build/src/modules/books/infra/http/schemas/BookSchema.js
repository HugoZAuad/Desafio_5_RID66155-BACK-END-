"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBookSchema = joi_1.default.object({
    titulo: joi_1.default.string().required(),
    pages: joi_1.default.number().integer().required(),
    ISBN: joi_1.default.number().integer().required(),
    editora: joi_1.default.string().required(),
});
exports.updateBookSchema = joi_1.default.object({
    titulo: joi_1.default.string(),
    pages: joi_1.default.number().integer(),
    ISBN: joi_1.default.number().integer(),
    editora: joi_1.default.string(),
}).min(1);
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
});
