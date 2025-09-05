import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { otpVerification } from './templates/otp-verification';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationOtpMail(email: string, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      //   from:'jid@taglineinfotech.com' -> override
      text: `Your OTP code is: ${otp}`,
      html: otpVerification(otp),
    });
  }

  async resetPasswordMail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      template: './reset-password',
      context: { resetLink },
    });
  }
}
