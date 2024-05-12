import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/user/schema/user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
      DatabaseModule,
    ],
    controllers: [UserController],
    providers: [UserService, JwtService],
  })
  export class UserModule {}
  