import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaservice: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaservice.task.create({
      data: createTaskDto,
    }); // OK backend vers BDD en donnant l'id de liste
  }

  findAllTasks(listId: string) {
    return this.prismaservice.task.findMany({
      where: { listId: parseInt(listId) },
    });  // OK backend vers BDD en donnant l'id de liste
  }

  findOneTask(id: string) {
    return this.prismaservice.task.findUnique({
      where: { id: parseInt(id) },
    }); // OK testé back vers BDD avec taskID entré manuellement
  }
}