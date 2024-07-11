// Le décorateur @ApiProperty est obligatoire pour que les propriétés de classe soient visibles du module Swagger
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ required: false })
  description?: string;

  @IsISO8601({
    strict: true,
  })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  deadline: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  is_done: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  listId: number;
}
