"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const BooksControllers_1 = require("../controllers/BooksControllers");
const BookSchema_1 = require("../schemas/BookSchema");
const router = (0, express_1.Router)();
const controller = new BooksControllers_1.BooksControllers();
router.post('/', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: BookSchema_1.createBookSchema }), async (req, res, next) => {
    try {
        await controller.create(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.get('/', async (req, res, next) => {
    try {
        await controller.list(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.PARAMS]: BookSchema_1.idParamSchema, [celebrate_1.Segments.BODY]: BookSchema_1.updateBookSchema }), async (req, res, next) => {
    try {
        await controller.update(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.delete('/:id', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.PARAMS]: BookSchema_1.idParamSchema }), async (req, res, next) => {
    try {
        await controller.delete(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.get('/:id', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.PARAMS]: BookSchema_1.idParamSchema }), async (req, res, next) => {
    try {
        await controller.getById(req, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
