import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'; // pour grouper les endpoints sur Swagger et créer des réponses claires ou du bon type

@Controller('tasks')
@UseGuards(JwtAuthGuard) // pour protéger toutes les API
@ApiBearerAuth() // pour signaler à swagger que les requêtes sont protégées
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/tasksByListId:listId')
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  findAllTasks(@Param('listId', ParseIntPipe) listId: number) {
    return this.tasksService.findAllTasks(listId);
  }

  @Get('/taskByTaskId:taskId')
  @ApiOkResponse({ type: TaskEntity })
  findOneTask(@Param('taskId', ParseIntPipe) id: number) {
    return this.tasksService.findOneTask(id);
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
    return this.tasksService.remove(id);
  }
}
