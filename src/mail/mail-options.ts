import { ConfigService } from '@nestjs/config/dist';
import { MailOptions } from 'nodemailer';

export function createVerificationMailOption(
  configService: ConfigService,
  email: string,
  verificationToken: string,
): MailOptions {
  return {
    from: configService.get('ETHEREAL_USER'),
    to: email,
    subject: 'Email Verification Token',
    text: `Please click the following link to verify your email: ${configService.get(
      'DOMAIN',
    )}/users/verify?token=${verificationToken}`,
  };
}

export function createPasswordResetMailOption(
  configService: ConfigService,
  email: string,
  resetToken: string,
): MailOptions {
  return {
    from: configService.get('ETHEREAL_USER'),
    to: email,
    subject: 'Password Reset Token',
    text: `Please click the following link to reset your password: ${configService.get(
      'DOMAIN',
    )}/users/reset-password?token=${resetToken}`,
  };
}
