import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signup(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    const token = this.jwtService.sign({ email: user.email });

    return { token };
  }
}
