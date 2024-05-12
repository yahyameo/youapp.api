import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber, Length, IsDate, IsDateString } from 'class-validator';
import BaseDto from '../../dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDTO  {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    @IsDateString()
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
    @IsOptional()
    zodiac: string;

    @ApiProperty()
    @IsOptional()
    gender: string;

    @ApiProperty()
    interests:string[];

    

}

export default UpdateProfileDTO;
