import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config/dist';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import {
  createVerificationMailOption,
  createPasswordResetMailOption,
} from 'src/mail/mail-options';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // User verification email
  async sendVerificationEmail(email: string) {
    // Generate verification token
    const verificationToken = this.generateRandomToken();

    // Save the token in user table
    const user = await this.userRepository.findOne({ where: { email } });
    user.verificationToken = verificationToken;
    await this.userRepository.save(user);

    // Compose email
    const mailOptions = createVerificationMailOption(
      this.configService,
      email,
      verificationToken,
    );

    // Send email
    const info = await this.mailService.sendMail(mailOptions);
    console.log(info);
  }

  async sendPasswordResetEmail(user: User) {
    const resetToken = this.generateRandomToken();
    user.resetToken = resetToken;
    user.resetTokenExpiry = this.calculateTokenExpiry();
    await this.userRepository.save(user);

    const mailOptions = createPasswordResetMailOption(this.configService, user.email, resetToken);

    const info = await this.mailService.sendMail(mailOptions);
    console.log(info);
    return { success: true, message: '{Password reset email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { resetToken: token, resetTokenExpiry: MoreThan(new Date()) },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await this.userRepository.save(user);
    return { success: true, message: 'Password reset successfull' };
  }

  private generateRandomToken(): string {
    return uuidv4();
  }

  private calculateTokenExpiry(): Date {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // 1 Hour expiry
    return expiryDate;
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword, // Save the hashed password
    });

    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async findByVerificationToken(verificationToken: string) {
    return await this.userRepository.findOne({ where: { verificationToken } });
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}
