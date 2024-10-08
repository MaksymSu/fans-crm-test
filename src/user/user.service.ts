import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });
    if (candidate) {
      throw new HttpException('This email is already taken', HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userRepository.create({ ...createUserDto, password: passwordHash });

    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id }, attributes: ['id', 'name', 'email'] });
  }
}
