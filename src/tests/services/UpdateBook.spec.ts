import { UpdateBook } from '@modules/books/services/UpdateBook';
import AppError from '@shared/errors/AppErrors';

describe('UpdateBook Service', () => {
  const mockBookRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  let service: UpdateBook;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UpdateBook(mockBookRepository as any);
  });

  it('deve atualizar um livro existente e retornar mensagem', async () => {
    mockBookRepository.findById.mockResolvedValue({ id: 1, titulo: 'Antigo', editora: 'A' });
    mockBookRepository.update.mockResolvedValue({ id: 1, titulo: 'Novo', editora: 'B' });

    const result = await service.execute(1, { titulo: 'Novo' });

    expect(result).toEqual({
      livro: { id: 1, titulo: 'Novo', editora: 'B' },
      mensagem: 'O livro Novo foi atualizado na informação solicitada',
    });
    expect(mockBookRepository.update).toHaveBeenCalledWith(1, { titulo: 'Novo' });
  });

  it('deve lançar erro se o livro não existir', async () => {
    mockBookRepository.findById.mockResolvedValue(null);

    await expect(service.execute(1, { titulo: 'Novo' })).rejects.toBeInstanceOf(AppError);
  });
});
