import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import BaseDto from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto extends BaseDto {

    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    businessCard: string;
  
    @ApiProperty()
    @IsString()
    designation: string;
  
    @ApiProperty()
    @IsString()
    department: string;
  
    @ApiProperty()
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    phone: string;
  
    @ApiProperty()
    @IsArray()
    @IsOptional()
    mobile: string[];

    @ApiProperty()
    @IsString()
    customerId: string;

}

export default ContactDto;
