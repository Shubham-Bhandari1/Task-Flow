import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string; // hex, used as a small dot next to the project name in the sidebar

  @Column()
  @Index()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;
}
