import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from '../../../config/database';
import BooksRoutes from '../../../modules/books/infra/http/routes/BooksRoutes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

dotenv.config();

const app: Application = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

app.use(cors());
app.use(express.json());

app.use('/livros', BooksRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de Livros funcionando!');
});

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandleMiddleware.handleError(err, req, res, next);
});

export default app;
