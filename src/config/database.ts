import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'livrosdb',
  synchronize: false,
  logging: false,
  entities: [
    __dirname + (isProduction ? '/../modules/books/infra/database/entities/*.js' : '/../modules/books/infra/database/entities/*.ts')
  ],
  migrations: [
    __dirname + (isProduction ? '/../shared/infra/typeorm/migrations/*.js' : '/../shared/infra/typeorm/migrations/*.ts')
  ],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});
