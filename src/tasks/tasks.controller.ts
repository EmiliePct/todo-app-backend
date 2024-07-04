import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/interface/task.interface';

//va écouter localhost:3000/tasks
@Controller('tasks')
export class TasksController {
  // notre injecteur doit fournir une instance de tasksService, sous fourme d'un accesseur
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask) {
    //@Body nous permet de récupérer le corps de la requête vers le serveur
    console.log('newTask', newTask);
    this.tasksService.create(newTask);
  }
}
