import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from '../auth/strategies/auth.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Set the expiration time for the token
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthStrategy],
})
export class UsersModule {}
