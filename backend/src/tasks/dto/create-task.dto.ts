import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  IsBoolean,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class SubtaskItemDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  done: boolean;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(120, { message: 'Title must be 120 characters or fewer' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'status must be one of: todo, doing, completed, on-hold',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'priority must be one of: no-priority, urgent, high, medium, low',
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  assignee?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];

  @IsOptional()
  @IsString()
  reporter?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  @ValidateIf((_, value) => value != null)
  @IsDateString({}, { message: 'dueDate must be a valid date (YYYY-MM-DD)' })
  dueDate?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubtaskItemDto)
  subtasks?: SubtaskItemDto[];

  @IsOptional()
  @IsString()
  projectId?: string;
}
