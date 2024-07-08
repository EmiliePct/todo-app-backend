import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';// pour grouper les endpoints sur Swagger et créer des réponses claires ou du bon type

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() createTaskDto: CreateTaskDto) {
    createTaskDto.deadline = new Date(createTaskDto.deadline);
    return this.tasksService.create(createTaskDto); // OK testé back vers BDD avec listID entré manuellement,
  }

  @Get('/tasksByListId:listId')
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  findAllTasks(@Param('listId', ParseIntPipe) listId: number) {
    return this.tasksService.findAllTasks(listId); // OK testé back vers BDD avec listID entré manuellement, retourne un tableau d'objets
  }

  @Get('/taskByTaskId:taskId')
  @ApiOkResponse({ type: TaskEntity })
  findOneTask(@Param('taskId', ParseIntPipe) id: number) {
    return this.tasksService.findOneTask(id); // OK testé back vers BDD avec taskID entré manuellement, retourne un objet
  }

  @Patch(':taskId')
  @ApiOkResponse({ type: TaskEntity })
  update(
    @Param('taskId', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id); // OK testé back vers BDD avec listID entré manuellement, retourne la liste supprimée ?. Supprime bien les tâches een cascade.
  }
}
