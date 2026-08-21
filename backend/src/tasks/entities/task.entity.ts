import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * This is an "Entity" — TypeORM's word for a class that maps directly to
 * a database table. Every @Column below becomes a real column in the
 * `tasks` table (created automatically by `synchronize: true` in
 * app.module.ts). You never write SQL yourself; TypeORM generates it from
 * this class whenever TasksService reads or writes a Task.
 */

export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  COMPLETED = 'completed',
  ON_HOLD = 'on-hold',
}

export enum TaskPriority {
  NO_PRIORITY = 'no-priority',
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') // auto-generated id, e.g. "3fa2c1..."
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', default: TaskStatus.TODO })
  @Index() // speeds up "find all tasks with status = X" queries
  status: TaskStatus;

  @Column({ type: 'varchar', default: TaskPriority.NO_PRIORITY })
  priority: TaskPriority;

  @Column({ nullable: true })
  assignee: string; // just a name for now — no separate "team members" table

  @Column({ type: 'simple-array', nullable: true })
  labels: string[]; // stored as one comma-separated text column, read back out as an array

  @Column({ nullable: true })
  reporter: string;

  @Column({ type: 'date', nullable: true })
  dueDate: string | null;

  @Column({ type: 'simple-json', nullable: true })
  subtasks: { id: string; title: string; done: boolean }[]; // stored as one JSON text column

  @Column({ nullable: true })
  projectId: string;

  // Every task belongs to exactly one user. onDelete: 'CASCADE' means if
  // that user is ever deleted, their tasks are deleted too automatically.
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  owner: User;

  @Column()
  @Index()
  ownerId: string; // the actual foreign key column TasksService filters by

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
