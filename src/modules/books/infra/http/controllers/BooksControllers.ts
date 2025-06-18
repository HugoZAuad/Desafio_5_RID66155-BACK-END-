import { Request, Response } from 'express'
import { BookRepositories } from '../../../infra/database/repositories/BookRepositories'
import { CreateBook } from '../../../services/CreateBook'
import { DeleteBook } from '../../../services/DeleteBook'
import { ListBooks } from '../../../services/ListBooks'
import { UpdateBook } from '../../../services/UpdateBook'
import { AppDataSource } from '../../../../../config/database'

const bookRepository = new BookRepositories(AppDataSource)

export class BooksControllers {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const createBook = new CreateBook(bookRepository)
      const book = await createBook.execute(request.body)
      return response.status(201).json(book)
    } catch (error) {
      console.error('Erro ao criar livro:', error)
      return response.status(500).json({ type: 'error', message: 'Erro ao criar livro.' })
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    try {
      console.log('GET /books chamado')
      const listBooks = new ListBooks(bookRepository)
      const books = await listBooks.execute()
      console.log(`Livros retornados:`, books)
      return response.json(books)
    } catch (error) {
      console.error('Erro ao listar livros:', error)
      return response.status(500).json({ type: 'error', message: 'Erro ao listar livros.' })
    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const book = await bookRepository.findById(Number(id))
      if (!book) {
        return response.status(404).json({ message: 'Book not found' })
      }
      return response.json(book)
    } catch (error) {
      console.error('Erro ao buscar livro por ID:', error)
      return response.status(500).json({ message: 'Erro interno ao buscar o livro.' })
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const updateBook = new UpdateBook(bookRepository)
      const result = await updateBook.execute(Number(id), request.body)
      if (!result) {
        return response.status(404).json({ message: 'Book not found' })
      }
      return response.json(result)
    } catch (error) {
      console.error('Erro ao atualizar livro:', error)
      return response.status(500).json({ message: 'Erro ao atualizar livro.' })
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const deleteBook = new DeleteBook(bookRepository)
      const result = await deleteBook.execute(Number(id))
      if (!result) {
        return response.status(404).json({ message: 'Book not found' })
      }
      return response.json(result)
    } catch (error) {
      console.error('Erro ao deletar livro:', error)
      return response.status(500).json({ message: 'Erro ao deletar livro.' })
    }
  }
}
