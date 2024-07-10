// Le décorateur @ApiProperty decorators est obligatoire pour que les propriétés de classe soient visibles du module Swagger
import { Task } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity implements Task {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty({ required: true })
  deadline: Date;

  @ApiProperty({ required: true, default: false })
  is_done: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: true })
  listId: number;
}
