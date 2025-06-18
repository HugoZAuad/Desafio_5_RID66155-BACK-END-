"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../../shared/infra/http/api"));
const database_1 = require("../../config/database");
let server;
let api;
describe('Books API Integration', () => {
    beforeAll(async () => {
        await database_1.AppDataSource.initialize();
        await new Promise((resolve) => {
            server = api_1.default.listen(0, () => {
                const port = server.address().port;
                api = (0, supertest_1.default)(`http://localhost:${port}`);
                resolve();
            });
        });
    });
    afterAll(async () => {
        await database_1.AppDataSource.destroy();
        await new Promise((resolve) => server.close(() => resolve()));
    });
    it('deve criar, listar, atualizar e deletar um livro', async () => {
        // Criar livro
        const createRes = await api.post('/livros').send({
            titulo: 'Livro Integração',
            pages: 100,
            ISBN: 123,
            editora: 'Editora X',
        });
        expect(createRes.status).toBe(201);
        expect(createRes.body.titulo).toBe('Livro Integração');
        const id = createRes.body.id;
        // Listar livros
        const listRes = await api.get('/livros');
        expect(listRes.status).toBe(200);
        expect(Array.isArray(listRes.body)).toBe(true);
        // Atualizar livro
        const updateRes = await api
            .put(`/livros/${id}`)
            .send({ titulo: 'Livro Atualizado' });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.mensagem).toContain('foi atualizado');
        // Deletar livro
        const deleteRes = await api.delete(`/livros/${id}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.body.mensagem).toContain('foi deletado');
    });
    it('retorna erro ao tentar deletar livro inexistente', async () => {
        const res = await api.delete('/livros/999999');
        expect(res.status).toBe(404);
        expect(res.body.message || res.body.mensagem).toBeDefined();
    });
    it('retorna erro ao tentar criar livro inválido', async () => {
        const res = await api
            .post('/livros')
            .send({ titulo: '', pages: 'abc', ISBN: null, editora: '' });
        expect(res.status).toBe(400);
        expect(res.body).toBeDefined();
    });
});
