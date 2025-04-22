import { Expose } from 'class-transformer';

export class ShortUrlResponseDto {
  @Expose()
  id: string;

  @Expose()
  originalUrl: string;

  @Expose()
  shortUrl: string;

  @Expose()
  clickCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}