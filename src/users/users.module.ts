import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

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
  providers: [UsersService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
