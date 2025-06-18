import { Router } from 'express';
import BooksRoutes from '../../../../modules/books/infra/http/routes/BooksRoutes';

const routes = Router();

routes.use('/books', BooksRoutes);

export default routes;
