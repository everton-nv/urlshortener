import { Injectable } from '@nestjs/common';
import { ShortUrlRepository } from '../repositories/short-url.repository';
import { CreateShortUrlDto } from '../dto/create-short-url.dto';
import { UpdateShortUrlDto } from '../dto/update-short-url.dto';
import { ShortUrlResponseDto } from '../dto/short-url-response.dto';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ShortUrl } from '../entities/short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly configService: ConfigService,
  ) {}

  private generateShortCode(): string {
    return nanoid(6);
  }

  async createShortUrl(createDto: CreateShortUrlDto, userId?: string): Promise<ShortUrlResponseDto> {
    const shortCode = createDto.customCode || this.generateShortCode();
    const shortUrl = await this.shortUrlRepository.create(createDto.originalUrl, shortCode, userId);

    return this.mapToDto(shortUrl);
  }

  async redirect(shortCode: string): Promise<string> {
    const shortUrl = await this.shortUrlRepository.findByShortCode(shortCode);
    if (!shortUrl) {
      throw new Error('URL não encontrada');
    }

    await this.shortUrlRepository.incrementClickCount(shortUrl.id);
    return shortUrl.originalUrl;
  }

  async findAllByUser(userId: string): Promise<ShortUrlResponseDto[]> {
    const shortUrls = await this.shortUrlRepository.findByUser(userId);
    return shortUrls.map(shortUrl => this.mapToDto(shortUrl));;
  }

  async findOne(id: string, userId: string): Promise<ShortUrlResponseDto> {
    const shortUrl = await this.shortUrlRepository.findOneById(id, userId);
    if (!shortUrl) {
      throw new Error('URL não encontrada');
    }
    return this.mapToDto(shortUrl);
  }

  async update(id: string, userId: string, updateDto: UpdateShortUrlDto): Promise<ShortUrlResponseDto> {
    console.log(userId)
    const shortUrl = await this.shortUrlRepository.update(id, userId, updateDto);
    if (!shortUrl) {
      throw new Error('URL não encontrada');
    }
    return this.mapToDto(shortUrl);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.shortUrlRepository.delete(id, userId);
  }

  private mapToDto(shortUrl: ShortUrl): ShortUrlResponseDto {
    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
    return {
      id: shortUrl.id,
      originalUrl: shortUrl.originalUrl,
      shortUrl: `${baseUrl}/${shortUrl.shortCode}`,
      clickCount: shortUrl.clickCount,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    };
  }
}