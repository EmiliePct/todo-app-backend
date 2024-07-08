import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ required: true }) // Le dévorateur @ApiProperty decorators est obligatoire pour que les propriétés de classe soient visibles du module Swagger
  title: string;

  @ApiProperty({ required: true })
  userId: number;
}
