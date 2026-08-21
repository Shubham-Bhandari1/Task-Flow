import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  /** Creates a fresh, disposable guest account with a friendly random name. */
  async createGuest(): Promise<User> {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const username = `guest-${suffix}-${Date.now()}`;
    const user = this.usersRepo.create({
      username,
      displayName: `Guest ${suffix}`,
      isGuest: true,
    });
    return this.usersRepo.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
