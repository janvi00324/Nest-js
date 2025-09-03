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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //You can use dto here also instead of Partial<User>
  async register(body: Partial<User>): Promise<User> {
    //becquse you used Partial<User>
    if (!body.password || !body.email) {
      throw new Error('Email and password are required');
    }
    const hashedPassword = await hashPassword(body.password);
    const otp = generateOTP();

    console.log('otp :>> ', otp);
    const user = await this.userService.createUser({
      ...body,
      otp,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new BadRequestException('User is not verified');
    }
    const isPasswordValid = await comparePassword(password, user.password);
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
}
