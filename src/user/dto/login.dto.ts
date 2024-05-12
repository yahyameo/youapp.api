import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import BaseDto from '../../dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO  {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    emailOrUsername: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}

export default LoginDTO;
