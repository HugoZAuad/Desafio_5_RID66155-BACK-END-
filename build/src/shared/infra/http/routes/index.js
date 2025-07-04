"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BooksRoutes_1 = __importDefault(require("../../../../modules/books/infra/http/routes/BooksRoutes"));
const routes = (0, express_1.Router)();
routes.use('/books', BooksRoutes_1.default);
exports.default = routes;
