import { createBookSchema, updateBookSchema, idParamSchema } from '@modules/books/infra/http/schemas/BookSchema';

describe('Book Joi Schemas', () => {
  it('valida corretamente um livro válido para criação', () => {
    const { error } = createBookSchema.validate({
      titulo: 'Livro Teste',
      pages: 100,
      ISBN: 123456,
      editora: 'Editora X',
    });
    expect(error).toBeUndefined();
  });

  it('retorna erro para livro inválido na criação', () => {
    const { error } = createBookSchema.validate({
      titulo: '',
      pages: 'abc',
      ISBN: null,
      editora: '',
    });
    expect(error).toBeDefined();
  });

  it('valida corretamente atualização parcial', () => {
    const { error } = updateBookSchema.validate({ titulo: 'Novo Título' });
    expect(error).toBeUndefined();
  });

  it('retorna erro se updateBookSchema receber objeto vazio', () => {
    const { error } = updateBookSchema.validate({});
    expect(error).toBeDefined();
  });

  it('valida corretamente o idParamSchema', () => {
    const { error } = idParamSchema.validate({ id: 1 });
    expect(error).toBeUndefined();
  });

  it('retorna erro se idParamSchema receber id inválido', () => {
    const { error } = idParamSchema.validate({ id: 'abc' });
    expect(error).toBeDefined();
  });
});
