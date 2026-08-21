import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  taskId: string;

  @Column()
  authorId: string;

  @Column()
  authorName: string; // denormalized so the frontend doesn't need a second lookup

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;
}
