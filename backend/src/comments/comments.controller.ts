import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Param('taskId') taskId: string) {
    return this.commentsService.findForTask(user.sub, taskId);
  }

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Param('taskId') taskId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      user.sub,
      taskId,
      user.sub,
      user.displayName || user.username,
      dto,
    );
  }
}
