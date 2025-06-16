import { Router } from 'express';
import BooksRoutes from '@modules/books/infra/http/routes/BooksRoutes';

const routes = Router();

routes.use('/livros', BooksRoutes);

export default routes;
