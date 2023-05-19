import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    if (user.isEmailVerified) {
      throw new ConflictException('Email already verified');
    }

    user.isEmailVerified = true;
    await this.usersService.save(user);

    return { success: true, message: 'Email verified successfully' };
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User already exists.');
    }

    const newUser = await this.usersService.signup(createUserDto);
    await this.usersService.sendVerificationEmail(newUser.email);
    return newUser;
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.usersService.signIn(signInDto);
    return { token };
  }

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.usersService.sendPasswordResetEmail(user);
    return result;
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const result = await this.usersService.resetPassword(token, newPassword);

    return result;
  }
}
