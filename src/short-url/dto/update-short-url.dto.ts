import { IsUrl, IsOptional } from 'class-validator';

export class UpdateShortUrlDto {
  @IsUrl({}, { message: 'URL original deve ser uma URL válida' })
  @IsOptional()
  originalUrl?: string;
}