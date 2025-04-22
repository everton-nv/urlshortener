import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from '../entities/short-url.entity';

@Injectable()
export class ShortUrlRepository {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly repository: Repository<ShortUrl>,
  ) {}

  async create(originalUrl: string, shortCode: string, userId?: string): Promise<ShortUrl> {
    const shortUrl = this.repository.create({
      originalUrl,
      shortCode,
      user: userId ? { id: userId } : null,
    });
    return await this.repository.save(shortUrl);
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    return await this.repository.findOne({
      where: { shortCode, deletedAt: null },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<ShortUrl[]> {
    return await this.repository.find({
      where: { user: { id: userId }, deletedAt: null },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: string, userId: string): Promise<ShortUrl | null> {
    return await this.repository.findOne({
      where: {
        id,
        user: { id: userId },
        deletedAt: null,
      },
      relations: ['user'],
    });
  }

  async update(id: string, userId: string, updates: Partial<ShortUrl>): Promise<ShortUrl | null> {
    // Step 1: Find the record (must include relation to use nested user.id filter)
    const shortUrl = await this.repository.findOne({
      where: {
        id,
        user: { id: userId },
        deletedAt: null,
      },
      relations: ['user'],
    });
  
    // Step 2: Return null or throw if not found
    if (!shortUrl) {
      return null; // or throw new NotFoundException(...)
    }
  
    // Step 3: Apply updates and save
    Object.assign(shortUrl, updates);
    await this.repository.save(shortUrl);
  
    return shortUrl;
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.repository.softDelete({ id, user: { id: userId } });
  }

  async incrementClickCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'clickCount', 1);
  }
}