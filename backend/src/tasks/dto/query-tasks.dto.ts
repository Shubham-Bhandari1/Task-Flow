import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

/**
 * Not a request body — this describes the URL query string for
 * GET /tasks?status=todo&priority=high&search=docs. Everything is
 * optional since you can list all tasks with no filters at all.
 */
export class QueryTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  search?: string;
}
