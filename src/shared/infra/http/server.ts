import express from 'express';
import { CorsMiddleware } from '../../middlewares/CorsMiddleware';
import livrosRoutes from '../../../modules/books/infra/http/routes/BooksRoutes';

const app = express();

app.use(express.json());

// Middleware de CORS antes das rotas
app.use(CorsMiddleware);

// Rotas principais
app.use('/livros', livrosRoutes);

// Rota de teste para ver se o servidor está rodando
app.get('/', (req, res) => {
  res.send('API de Livros rodando!');
});

// Middleware para tratar rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default app;