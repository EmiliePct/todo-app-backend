import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaservice: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaservice.task.create({
      data: createTaskDto,
    });
  }

  findAllTasks(listId: number) {
    return this.prismaservice.task.findMany({
      where: { listId },
    });
  }

  findOneTask(id: number) {
    return this.prismaservice.task.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaservice.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prismaservice.task.delete({
      where: { id },
    });
  }
}
