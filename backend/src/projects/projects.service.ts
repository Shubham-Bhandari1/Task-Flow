import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectsRepo: Repository<Project>,
  ) {}

  findAll(ownerId: string) {
    return this.projectsRepo.find({ where: { ownerId }, order: { createdAt: 'ASC' } });
  }

  create(ownerId: string, dto: CreateProjectDto) {
    const project = this.projectsRepo.create({ ...dto, ownerId });
    return this.projectsRepo.save(project);
  }
}
