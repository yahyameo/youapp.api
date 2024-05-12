import { FilterQuery, Model } from 'mongoose';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user';
import UserDto from 'src/user/dto/user.dto';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/utils/auth.user';
import { ResourceNotFoundException } from 'src/utils/exception/resource-not-found.exception';
import ChangePasswordDto from 'src/dto/change.password.dto';
import { ChangePasswordException } from 'src/utils/exception/change-password.exception';
import RegisterDTO from './dto/register.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import LoginDTO from './dto/login.dto';
import { UserAlreadyFoundException } from 'src/utils/exception/user-already-found.exception';
import { WrongEmailOrUsernameException } from 'src/utils/exception/wrong-email.exception';
import UpdateProfileDTO from './dto/update.profile.dto';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async findAll(
        user: AuthUser,
        documentsToSkip = 0,
        limitOfDocuments?: number,
        startId?: string,
        searchQuery?: string,
    ) {
        const filters: FilterQuery<UserDocument> = startId
            ? {
                _id: {
                    $gt: startId,
                },
            }
            : { isActive: true, _id: { $ne: user.userId } };

        if (searchQuery) {
            filters.$text = {
                $search: searchQuery,
            };
        }
        const findQuery = this.userModel
            .find(filters)
            .sort({ _id: 1 })
            .skip(documentsToSkip);

        if (limitOfDocuments) {
            findQuery.limit(limitOfDocuments);
        }

        const results = await findQuery;
        return results.map(user => new UserDto(user));
    }

    async findOne(id: string) {
        const result = await this.userModel
            .findOne({ _id: id, isActive: true });
        if (!result) {
            throw new ResourceNotFoundException();
        }
        return new UserDto(result);
    }

    async login(dto: LoginDTO) {

        const user = await this.userModel
            .findOne({ $or: [{ email: dto.emailOrUsername }, { username: dto.emailOrUsername }], isActive: true });
        if (!user) {
            throw new WrongEmailOrUsernameException();
        }

        const isMatch = await compare(dto.password, user.password);
        if (!isMatch) {
            throw new HttpException(
                'Wrong password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = await this.jwtService.signAsync(JSON.stringify({ email: user.email, username: user.username, _id: user._id }), { secret: process.env.Secret });
        return new UserLoginResponseDto(user, token,);
    }

    async register(userData: RegisterDTO,) {

        const findQuery = await this.userModel

            .findOne({ $or: [{ email: userData.email }, { username: userData.username }], isActive: true });

        if (findQuery) {
            throw new UserAlreadyFoundException();
        }

        const salt = await genSalt(10);
        let password = await hash(userData.password, salt);
        const createdUser = new this.userModel({
            email: userData.email, username: userData.username,
            password: password, joiningDate: new Date()
        });
        let user = await createdUser.save();
        const accessToken = await this.jwtService.signAsync(JSON.stringify({ email: user.email, username: user.username, _id: user._id }), { secret: process.env.Secret });
        return new UserLoginResponseDto(createdUser, accessToken);
    }

    async update(id: string, dto: UpdateProfileDTO) {
        const user = await this.userModel
            .findById(id);
        if (!user) {
            throw new ResourceNotFoundException();
        }
        user.name = dto.name;
        user.birthday = dto.birthday;
        user.width = dto.width;
        user.height = dto.height;
        user.horoscope = dto.name;
        user.interests = dto.interests;
        user.zodiac = dto.zodiac;
        await user.save();
        return new UserLoginResponseDto(user);
    }

    async changePassword(id: string, userData: ChangePasswordDto) {

        const user = await this.userModel
            .findOne({ _id: id });
        if (!user) {
            throw new ResourceNotFoundException();
        }

        const isMatch = await compare(userData.currentPassword, user.password);
        if (!isMatch) {
            throw new HttpException(
                'Current password does not match',
                HttpStatus.BAD_REQUEST,
            );
        }
        const salt = await genSalt(10);
        let password = await hash(userData.newPassword, salt);
        user.password = password;
        await user.save();
        return; //new UserLoginResponseDto(user);;
    }
    async uploadFile(file: Express.Multer.File, auth: AuthUser): Promise<string> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        const uniqueFileName = `${uuidv4()}${extname(file.originalname)}`;
        const uploadPath = `./uploads/${uniqueFileName}`;

        const writeStream = createWriteStream(uploadPath);
        writeStream.write(file.buffer);
        writeStream.end();

        ;
        const user = await this.userModel
            .findOne({ _id: auth.userId });
        user.picture = uniqueFileName;
        await user.save();
        return uniqueFileName;
    }

}
