import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import {  memoryStorage } from 'multer';
import { FileUploadModule } from '../../common/services/file-upload/file-upload.module';
@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    FileUploadModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
