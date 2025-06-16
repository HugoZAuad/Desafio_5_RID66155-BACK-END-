export interface IDeleteBookService {
  execute(id: number): Promise<{ sucesso: boolean; mensagem: string }>;
}
