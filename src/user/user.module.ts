import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})

export class UserModule { }
