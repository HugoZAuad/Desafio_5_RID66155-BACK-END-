import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import { CorsMiddleware } from '@shared/middlewares/CorsMiddleware';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from '../../../config/database';
import BooksRoutes from '@modules/books/infra/http/routes/BooksRoutes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

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

const allowedOrigins = [
  'https://desafio-5-rid-66155-front-end.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

// Removido uso do cors padrão, usando middleware customizado
app.use(CorsMiddleware);

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
