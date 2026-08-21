import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTasksDto } from './dto/query-tasks.dto';

/**
 * All the "business logic" for tasks lives here, not in the controller.
 * The controller's job is just to read the HTTP request and hand off to
 * this service — this file is the one place that actually talks to the
 * database (via `tasksRepo`, TypeORM's repository for the Task table).
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
  ) {}

  create(ownerId: string, dto: CreateTaskDto) {
    // dto has the fields from the request body (title, status, etc).
    // We add ownerId ourselves from the logged-in user's token — never
    // trust a client to say which user a task belongs to.
    const task = this.tasksRepo.create({ ...dto, ownerId });
    return this.tasksRepo.save(task);
  }

  /**
   * Every task list is scoped to the current user (ownerId) — one guest
   * can never see another guest's tasks. `filters` are optional
   * query-string params like ?status=todo&search=docs.
   */
  findAll(ownerId: string, filters: QueryTasksDto) {
    return this.tasksRepo.find({
      where: {
        ownerId,
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.search && { title: Like(`%${filters.search}%`) }),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(ownerId: string, id: string) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.ownerId !== ownerId) {
      // The task exists, just not for this user — 403, not 404, so we're
      // clear about *why* access is denied without leaking whether the id
      // exists for someone else.
      throw new ForbiddenException('You do not have access to this task');
    }
    return task;
  }

  async update(ownerId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(ownerId, id); // also checks ownership
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(ownerId: string, id: string) {
    const task = await this.findOne(ownerId, id);
    await this.tasksRepo.remove(task);
  }

  /** Small counts for the board header — how many tasks in each status. */
  async summary(ownerId: string) {
    const tasks = await this.tasksRepo.find({ where: { ownerId } });
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      doing: tasks.filter((t) => t.status === 'doing').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      onHold: tasks.filter((t) => t.status === 'on-hold').length,
    };
  }
}
