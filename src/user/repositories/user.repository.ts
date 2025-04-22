import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ 
      where: { email, deletedAt: null },
      select: ['id', 'username', 'email', 'password', 'isActive'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ 
      where: { id, deletedAt: null },
      relations: ['shortUrls'],
    });
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    await this.repository.update({ id }, updates);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}