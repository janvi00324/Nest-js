import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { comparePassword, generateOTP, hashPassword } from '../../utils/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/common/services/mail/mail.service';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly bcryptService: BcryptService,
  ) {}

  //You can use dto here also instead of Partial<User>
  // async register(body: Partial<User>): Promise<User> {
  async register(body: CreateUserDto): Promise<User> {
    //becquse you used Partial<User>
    // if (!body.password || !body.email) {
    //   throw new BadRequestException('Email and password are required');
    // }

    // const hashedPassword = await hashPassword(body.password);
    const hashedPassword = await this.bcryptService.hashPassword(body.password);
    const otp = generateOTP();

    await this.mailService.sendVerificationOtpMail(body.email, otp);

    const user = await this.userService.createUser({
      ...body,
      otp,
      password: hashedPassword,
    });
    return user;
  }

  // async login(email: string, password: string) {
  async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body?.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new BadRequestException('User is not verified');
    }
    //You can use it from common file also.
    // const isPasswordValid = await comparePassword(body?.password, user.password);

    const isPasswordValid = await this.bcryptService.comparePassword(
      body?.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }

  async sendResetPasswordLink(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    const token = uuidv4();
    //number
    // const expiry = Date.now() + 10 * 60 * 1000;
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await this.userService.findByIdAndUpdate(user.id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
    await this.mailService.resetPasswordMail(email, resetLink);
  }
}
