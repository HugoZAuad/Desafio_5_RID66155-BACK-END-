import { ListBooks } from '../../modules/books/services/ListBooks';
import AppError from '../../shared/errors/AppErrors';

describe('ListBooks Service', () => {
  const mockBookRepository = {
    findAll: jest.fn(),
  };

  let service: ListBooks;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ListBooks(mockBookRepository as any);
  });

  it('deve listar todos os livros', async () => {
    const fakeBooks = [
      { id: 1, titulo: 'Livro 1', pages: 100, ISBN: 123, editora: 'Editora X' },
      { id: 2, titulo: 'Livro 2', pages: 200, ISBN: 456, editora: 'Editora Y' },
    ];
    mockBookRepository.findAll.mockResolvedValue(fakeBooks);

    const result = await service.execute();

    expect(result).toEqual(fakeBooks);
    expect(mockBookRepository.findAll).toHaveBeenCalled();
  });

  it('deve lançar erro ao falhar na listagem', async () => {
    mockBookRepository.findAll.mockRejectedValue(new Error('DB error'));

    await expect(service.execute()).rejects.toBeInstanceOf(AppError);
  });
});
