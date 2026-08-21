import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: 'status must be one of: todo, doing, completed, on-hold',
  })
  status: TaskStatus;
}

export class UpdateTaskPriorityDto {
  @IsEnum(TaskPriority, {
    message: 'priority must be one of: no-priority, urgent, high, medium, low',
  })
  priority: TaskPriority;
}
