import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  pages: number

  @Column()
  ISBN: number

  @Column()
  editora: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}