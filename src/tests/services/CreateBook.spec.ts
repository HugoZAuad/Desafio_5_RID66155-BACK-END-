import { CreateBook } from '@modules/books/services/CreateBook';
import AppError from '@shared/errors/AppErrors';

describe('CreateBook Service', () => {
  const mockBookRepository = {
    create: jest.fn(),
  };

  const fakeBook = { id: 1, titulo: 'Novo Livro', pages: 100, ISBN: 123, editora: 'Editora X' };
  let service: CreateBook;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateBook(mockBookRepository as any);
  });

  it('deve criar um livro com sucesso', async () => {
    mockBookRepository.create.mockResolvedValue(fakeBook);

    const result = await service.execute({
      titulo: 'Novo Livro',
      pages: 100,
      ISBN: 123,
      editora: 'Editora X',
    });

    expect(result).toEqual(fakeBook);
    expect(mockBookRepository.create).toHaveBeenCalledWith({
      titulo: 'Novo Livro',
      pages: 100,
      ISBN: 123,
      editora: 'Editora X',
    });
  });

  it('deve lançar erro ao falhar na criação', async () => {
    mockBookRepository.create.mockRejectedValue(new Error('DB error'));

    await expect(
      service.execute({
        titulo: 'Novo Livro',
        pages: 100,
        ISBN: 123,
        editora: 'Editora X',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
