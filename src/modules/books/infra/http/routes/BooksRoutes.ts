import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { BooksControllers } from '../controllers/BooksControllers';
import { createBookSchema, updateBookSchema, idParamSchema } from '../schemas/BookSchema';

const router = Router();
const controller = new BooksControllers();

router.post(
  '/',
  celebrate({ [Segments.BODY]: createBookSchema }),
  async (req, res, next) => {
    try {
      await controller.create(req, res);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      await controller.list(req, res);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: idParamSchema, [Segments.BODY]: updateBookSchema }),
  async (req, res, next) => {
    try {
      await controller.update(req, res);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: idParamSchema }),
  async (req, res, next) => {
    try {
      await controller.delete(req, res);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: idParamSchema }),
  async (req, res, next) => {
    try {
      await controller.getById(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
