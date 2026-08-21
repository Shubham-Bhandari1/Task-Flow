import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

/**
 * A single table serves both guest and (future) registered users.
 * Guests are created on the fly by POST /api/auth/guest and are marked
 * isGuest = true so we can distinguish them later (e.g. to prune old
 * guest accounts, or to prompt "sign up to keep your tasks").
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string; // e.g. "Guest-4F2A" — auto-generated for guests

  @Column({ nullable: true })
  displayName: string;

  @Column({ default: true })
  isGuest: boolean;

  @Column({ nullable: true, select: false })
  passwordHash: string; // only used for non-guest accounts, never returned by default

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];
}
