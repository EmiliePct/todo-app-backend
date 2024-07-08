import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ required: true }) // Le dévorateur @ApiProperty decorators est obligatoire pour que les propriétés de classe soient visibles du module Swagger
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: true })
  deadline: Date;

  @ApiProperty({ required: true, default: false })
  is_done: boolean;

  @ApiProperty({ required: true })
  listId: number;
}
