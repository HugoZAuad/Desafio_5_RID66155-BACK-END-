import { DeleteBook } from '@modules/books/services/DeleteBook';
import AppError from '@shared/errors/AppErrors';

describe('DeleteBook Service', () => {
  const mockBookRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  let service: DeleteBook;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new DeleteBook(mockBookRepository as any);
  });

  it('deve deletar um livro existente e retornar mensagem', async () => {
    mockBookRepository.findById.mockResolvedValue({ id: 1, titulo: 'Livro Teste' });
    mockBookRepository.delete.mockResolvedValue(true);

    const result = await service.execute(1);

    expect(result).toEqual({ sucesso: true, mensagem: 'O livro Livro Teste foi deletado.' });
    expect(mockBookRepository.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro se o livro não existir', async () => {
    mockBookRepository.findById.mockResolvedValue(null);

    await expect(service.execute(1)).rejects.toBeInstanceOf(AppError);
  });
});
