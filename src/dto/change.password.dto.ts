import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {

    @ApiProperty({minLength:8})
    @IsString()
    newPassword: string;

    @ApiProperty()
    @IsString()
    currentPassword: string;

}

export default ChangePasswordDto;
