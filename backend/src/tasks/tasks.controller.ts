import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  UpdateTaskDto,
  UpdateTaskStatusDto,
  UpdateTaskPriorityDto,
} from './dto/update-task.dto';
import { QueryTasksDto } from './dto/query-tasks.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: QueryTasksDto) {
    return this.tasksService.findAll(user.sub, query);
  }

  // Must come before ':id' — otherwise Nest would try to match "summary"
  // as if it were a task id.
  @Get('summary')
  summary(@CurrentUser() user: JwtPayload) {
    return this.tasksService.summary(user.sub);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.tasksService.findOne(user.sub, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(user.sub, id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.update(user.sub, id, { status: dto.status });
  }

  @Patch(':id/priority')
  updatePriority(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateTaskPriorityDto,
  ) {
    return this.tasksService.update(user.sub, id, { priority: dto.priority });
  }

  @Delete(':id')
  @HttpCode(204) // 204 = success, nothing to send back
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.tasksService.remove(user.sub, id);
  }
}
