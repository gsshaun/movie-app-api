import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Query,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    if (user.isEmailVerified) {
      throw new UnauthorizedException('Email already verified');
    }

    user.isEmailVerified = true;
    await this.usersService.save(user);

    return { success: true, message: 'Email verified successfully' };
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.signup(createUserDto);
    await this.usersService.sendVerificationEmail(newUser.email);
    return newUser;
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    const token = this.jwtService.sign({ email: user.email });

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
