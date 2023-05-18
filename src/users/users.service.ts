import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
}
