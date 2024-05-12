import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import ParamsWithId from 'src/utils/paramsWithId';
import { PaginationParams } from 'src/utils/paginationParams';
import UserDto from 'src/user/dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { CustomMessage } from 'src/utils/decorator/custom-message.decorator';
import ChangePasswordDto from 'src/dto/change.password.dto';
import RegisterDTO from './dto/register.dto';
import LoginDTO from './dto/login.dto';
import UpdateProfileDTO from './dto/update.profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post("register")
    @CustomMessage('User registered successfully')
    async register(@Body() user: RegisterDTO) {
        return this.userService.register(user);
    }

    @Post("login")
    @CustomMessage('User logged in successfully')
    async login(@Body() dto: LoginDTO) {
        return this.userService.login(dto);
    }

    @Get("getProfile")
    @UseGuards(AuthGuard)
    async getProfile(@User() user: AuthUser) {
        return this.userService.findOne(user.userId);
    }

    @Put('updateProfile')
    @CustomMessage('Profile updated successfully')
    @UseGuards(AuthGuard)
    async updateProfile(@Body() dto: UpdateProfileDTO, @User() user: AuthUser) {
        return this.userService.update(user.userId, dto);
    }

    @Put('changePassword')
    @CustomMessage('Password changed successfully')
    @UseGuards(AuthGuard)
    async changePassword(@Body() userDto: ChangePasswordDto, @User() user: AuthUser) {
        return this.userService.changePassword(user.userId, userDto);
    }

    @Get("getUsers")
    @UseGuards(AuthGuard)
    async getUsers(@Query() { skip, limit, startId }: PaginationParams, @User() user: AuthUser) {
        return this.userService.findAll(user,skip, limit, startId, null);
    }

    @Get("getUserById/:id")
    @UseGuards(AuthGuard)
    async getUserById(@Param() { id }: ParamsWithId) {
        return this.userService.findOne(id);
    }
    @CustomMessage('Profile picture uploaded successfully')
    @Post("uploadProfilePicture")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    async uploadAvatar(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],

            }),
        )
        file: Express.Multer.File,
        @User() user: AuthUser
    ) {
        return this.userService.uploadFile(file, user);
    }
}
