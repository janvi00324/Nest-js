import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import morgan from 'morgan';
import { appConfig } from './config/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(':method :url :response-time'));
  app.use(express.json());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  console.log('process.env.PORT', appConfig.PORT);
  await app.listen(appConfig.PORT ?? 3000);
}
bootstrap();
