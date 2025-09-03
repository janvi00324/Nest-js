import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { loginDto } from '../users/dto/login.dto';
import { FileUploadService } from 'src/common/services/file-upload/file-upload.service';
import * as fs from 'fs/promises';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('file'))
  //RESPONSE for custom status code
  // @HttpCode(200)
  // @HttpCode(HttpStatus.OK)
  async signup(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserDto,
  ): Promise<{ message: string; data: User | null }> {
    const existingUser = await this.userService.findByEmail(body.email);
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const uploadResult = await this.fileUploadService.handleFileUpload(
      file,
      'profile-pic',
    );
    const filepath: string = uploadResult?.filePath;
    //RESPONSE
    // if (existingUser) {
    //   //this wil; send 201 status code by default
    //   return { message: 'User already exists', data: null };
    // }

    //this will send 409 status code , conflict
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    let imagePath = null;
    const userPayload = { ...body, profileImage: filepath };
    const user = await this.authService.register(userPayload);
    //by default send message with 201 statuscode
    return { message: 'User registered successfully', data: user };
  }

  @Post('/login')
  async login(@Body() body: loginDto) {
    return this.authService.login(body.email, body.password);
  }
}
