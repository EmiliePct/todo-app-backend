import { Injectable } from '@nestjs/common';
import { Task } from 'src/interface/task.interface';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      title: 'create tasks app',
      description: 'create NestJS tasks app',
      isDone: true,
    },
    {
      title: 'create data base',
      description: 'create postgreSQL data base',
      isDone: false,
    },
    {
      title: 'create front end',
      description: 'create react front end',
      isDone: false,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  create(task: Task) {
    this.tasks = [...this.tasks, task];
  }
}
