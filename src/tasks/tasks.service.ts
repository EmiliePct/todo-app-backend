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
    }); // OK backend vers BDD en donnant l'id de liste
  }

  findAllTasks(listId: number) {
    return this.prismaservice.task.findMany({
      where: { listId },
    }); // OK backend vers BDD en donnant l'id de liste
  }

  findOneTask(id: number) {
    return this.prismaservice.task.findUnique({
      where: { id },
    }); // OK testé back vers BDD avec taskID entré manuellement
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaservice.task.update({
      where: { id },
      data: updateTaskDto,
    }); // OK mais il faut envoyer toutes les données d'identification de la tâche...
  }

  remove(id: number) {
    return this.prismaservice.task.delete({
      where: { id },
    }); // OK testé back vers BDD avec taskID entré manuellement
  }
}
