import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    createTaskDto.deadline = new Date(createTaskDto.deadline);
    return this.tasksService.create(createTaskDto); // OK testé back vers BDD avec listID entré manuellement,
  }

  @Get('/tasksByListId:listId')
  findAllTasks(@Param('listId') listId: string) {
    return this.tasksService.findAllTasks(listId); // OK testé back vers BDD avec listID entré manuellement, retourne un tableau d'objets
  }

  @Get('/taskByTaskId:taskId')
  findOneTask(@Param('taskId') id: string) {
    return this.tasksService.findOneTask(id); // OK testé back vers BDD avec taskID entré manuellement, retourne un objet
  }
}
