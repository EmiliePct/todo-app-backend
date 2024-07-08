// Le décorateur @ApiProperty decorators est obligatoire pour que les propriétés de classe soient visibles du module Swagger
import { List } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ListEntity implements List {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  userId: number;
}
