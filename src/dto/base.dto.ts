import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber, IsDate } from 'class-validator';

export class BaseDto {

    @IsOptional()
    createdBy: string;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    deletedAt:Date;

    @IsDate()
    @IsOptional()
    updatedAt:Date;

    @IsString()
    @IsOptional()
    company:string;
}

export default BaseDto;
