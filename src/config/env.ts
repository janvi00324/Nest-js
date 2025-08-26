import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
};
