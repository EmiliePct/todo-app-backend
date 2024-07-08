import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true }) // Le dévorateur @ApiProperty decorators est obligatoire pour que les propriétés de classe soient visibles du module Swagger
  title: string;

  @IsNumber()
  @ApiProperty({ required: true })
  userId: number;
}
