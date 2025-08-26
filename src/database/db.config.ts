import { DataSourceOptions } from 'typeorm';
import { appConfig } from '../config/env';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: appConfig.DB_HOST,
  port: Number(appConfig.DB_PORT),
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASS,
  database: appConfig.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
};
