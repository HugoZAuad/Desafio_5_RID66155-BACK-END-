import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from '@config/database';
import BooksRoutes from '@modules/books/infra/http/routes/BooksRoutes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import { CorsMiddleware } from '@shared/middlewares/CorsMiddleware';

dotenv.config();

const app: Application = express();

app.use(CorsMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com banco de dados estabelecida');
  })
  .catch((error: any) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

app.use(express.json());
app.use('/livros', BooksRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de Livros funcionando na Vercel! 📚');
});

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  console.error('Erro capturado no middleware de erro:', err);
  ErrorHandleMiddleware.handleError(err, req, res, next);
});

export default app;
