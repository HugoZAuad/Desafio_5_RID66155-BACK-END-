import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import { CorsMiddleware } from '../../middlewares/CorsMiddleware';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from '../../../config/database';
import BooksRoutes from '../../../modules/books/infra/http/routes/BooksRoutes';
import ErrorHandleMiddleware from '../../middlewares/ErrorHandleMiddleware';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

app.use(CorsMiddleware);
app.use(express.json());

app.use('/books', BooksRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de Livros funcionando!');
});

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandleMiddleware.handleError(err, req, res, next);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

export default app;