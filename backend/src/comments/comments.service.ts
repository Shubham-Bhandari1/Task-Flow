import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepo: Repository<Comment>,
    private readonly tasksService: TasksService,
  ) {}

  async findForTask(ownerId: string, taskId: string) {
    await this.tasksService.findOne(ownerId, taskId);
    return this.commentsRepo.find({ where: { taskId }, order: { createdAt: 'ASC' } });
  }

  async create(ownerId: string, taskId: string, authorId: string, authorName: string, dto: CreateCommentDto) {
    await this.tasksService.findOne(ownerId, taskId);
    const comment = this.commentsRepo.create({
      taskId,
      authorId,
      authorName,
      body: dto.body,
    });
    return this.commentsRepo.save(comment);
  }
}
