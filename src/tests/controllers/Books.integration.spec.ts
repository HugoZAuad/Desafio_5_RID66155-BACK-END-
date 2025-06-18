import request from 'supertest';
import app from '@shared/infra/http/api/server';
import { AppDataSource } from '@config/database';

let server: any;
let api: any;

describe('Books API Integration', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const port = (server.address() as any).port;
        api = request(`http://localhost:${port}`);
        resolve();
      });
    });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    await new Promise<void>((resolve) => server.close(() => resolve()));
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
