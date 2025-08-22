import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import morgan from 'morgan';
import { appConfig } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(':method :url :response-time'));
  app.use(express.json());
  console.log('process.env.PORT', appConfig.PORT);
  await app.listen(appConfig.PORT ?? 3000);
}
bootstrap();
