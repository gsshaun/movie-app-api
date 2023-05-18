import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // Create a nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: this.configService.get('ETHEREAL_USER'), // Read env
        pass: this.configService.get('ETHEREAL_PASS'),
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    return await this.transporter.sendMail(options);
  }
}
