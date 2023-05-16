import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signup(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn() {
    // Authentication is handled by the LocalStrategy
    return 'Sign in successful';
  }
}
