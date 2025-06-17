import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
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
    console.log('Conexão com o banco de dados estabelecida');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
    console.error(error);
  });

app.use(cors({
  origin: 'https://desafio-5-rid-66155-front-end.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 204,
}));

// Middleware para responder requisições OPTIONS (preflight) explicitamente
app.options('*', cors({
  origin: 'https://desafio-5-rid-66155-front-end.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
}));
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

export default app;
