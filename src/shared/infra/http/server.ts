import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from '../../../config/database';
import BooksRoutes from '@modules/books/infra/http/routes/BooksRoutes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import { CorsMiddleware } from '@shared/middlewares/CorsMiddleware';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(CorsMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com banco de dados estabelecida');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
    console.error(error);
  });

app.use(express.json());

app.use('/livros', BooksRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de Livros funcionando!');
});

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro capturado no middleware de erro:', err);
  ErrorHandleMiddleware.handleError(err, req, res, next);
});

export default app;
