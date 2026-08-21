/**
 * Optional local dev helper: creates a guest user, a project, and a few
 * sample tasks so /tasks isn't empty on first run.
 *
 * Run with: npm run seed  (after the app has started at least once so the
 * SQLite file/tables exist — TypeORM's synchronize:true creates them).
 */
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Task, TaskStatus, TaskPriority } from '../tasks/entities/task.entity';
import { Project } from '../projects/entities/project.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'taskflow',
    entities: [User, Task, Project],
    synchronize: true,
  });
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const taskRepo = dataSource.getRepository(Task);
  const projectRepo = dataSource.getRepository(Project);

  const user = await userRepo.save(
    userRepo.create({ username: 'seed-guest', displayName: 'Dexter', isGuest: true }),
  );

  const project = await projectRepo.save(
    projectRepo.create({ name: 'Pyramid App', color: '#4C5FD5', ownerId: user.id }),
  );

  const sampleTasks: Partial<Task>[] = [
    {
      title: 'Write API documentation',
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      assignee: 'Dexter',
      labels: ['docs'],
      reporter: 'Dexter',
    },
    {
      title: 'Design the login screen',
      status: TaskStatus.DOING,
      priority: TaskPriority.URGENT,
      assignee: 'Dexter',
      labels: ['design', 'frontend'],
    },
    {
      title: 'Set up CI pipeline',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.MEDIUM,
      labels: ['infra'],
    },
    {
      title: 'Review Q3 roadmap',
      status: TaskStatus.ON_HOLD,
      priority: TaskPriority.LOW,
    },
  ];

  for (const t of sampleTasks) {
    await taskRepo.save(taskRepo.create({ ...t, ownerId: user.id, projectId: project.id }));
  }

  console.log(`Seeded guest user "${user.username}" with ${sampleTasks.length} tasks.`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
