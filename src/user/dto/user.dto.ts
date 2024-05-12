import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import BaseDto from '../../dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schema/user';

export class UserDto extends BaseDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    @IsOptional()
    joiningDate: Date;

    @IsOptional()
    lastLoginTime: Date;

    @ApiProperty()
    @IsOptional()
    picture: string;
  
    @ApiProperty()
    @IsOptional()
    birthday: Date;
  
    @ApiProperty()
    @IsOptional()
    horoscope: string;
  
    @ApiProperty()
    @IsOptional()
    width: number;
  
    @ApiProperty()
    @IsOptional()
    height: number;

    @ApiProperty()
    interests:string[];

    @ApiProperty()
    zodiac: string;
  
    @ApiProperty()
    gender: string;

    constructor(user:User){
        super();
        this.name = user?.name;
        this.username = user?.username;
        this.email = user.email;
        this.birthday = user.birthday;
        this.horoscope = user.horoscope;
        this.zodiac = user.zodiac;
        this.gender = user.gender;
        this.interests = user.interests;
        this.width = user.width;
        this.height = user.height;
        this.picture = user.picture;
        this.userId = user._id.toString();
    }

}

export default UserDto;
