"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const CorsMiddleware_1 = require("@middlewares/middlewares/CorsMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const database_1 = require("@config/database");
const BooksRoutes_1 = __importDefault(require("@modules/books/infra/http/routes/BooksRoutes"));
const ErrorHandleMiddleware_1 = __importDefault(require("@middlewares/middlewares/ErrorHandleMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida');
})
    .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
});
app.use(CorsMiddleware_1.CorsMiddleware);
app.use(express_1.default.json());
app.use('/books', BooksRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API de Livros funcionando!');
});
app.use((0, celebrate_1.errors)());
app.use((err, req, res, next) => {
    ErrorHandleMiddleware_1.default.handleError(err, req, res, next);
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}
exports.default = app;
