import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber, Length } from 'class-validator';
import BaseDto from '../../dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO  {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;

}

export default RegisterDTO;
