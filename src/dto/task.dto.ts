import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import BaseDto from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto extends BaseDto {
  
    @ApiProperty()
    @IsString()
    projectId: string;
  
    @ApiProperty()
    @IsString()
    assignedTo: string;
  
    @ApiProperty()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    completionDeadline: string;
  
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    status: number;

    @ApiProperty()
    @IsString()
    customerId: string;

}

export default TaskDto;
