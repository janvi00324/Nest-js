import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/env';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: appConfig.DB_HOST,
      port: Number(appConfig.DB_PORT),
      username: appConfig.DB_USERNAME,
      password: appConfig.DB_PASS,
      database: appConfig.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
      // UR:- Load all entity files automatically instead of listing manually.
      // Use this when you get repository via DataSource directly (autoLoadEntities won’t work here).
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
