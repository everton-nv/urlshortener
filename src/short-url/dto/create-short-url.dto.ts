import { IsUrl, IsOptional, IsString } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl({}, { message: 'URL original deve ser uma URL válida' })
  originalUrl: string;

  @IsOptional()
  @IsString()
  customCode?: string;
}