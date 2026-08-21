import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { CommentsModule } from './comments/comments.module';
import { HealthModule } from './health/health.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Project } from './projects/entities/project.entity';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Support both DATABASE_URL (Render/Railway) and individual vars (local dev)
      ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
          }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'taskflow',
          }),
      entities: [User, Task, Project, Comment],
      synchronize: true, // fine for an assessment/dev DB; use migrations in real prod
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    CommentsModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
