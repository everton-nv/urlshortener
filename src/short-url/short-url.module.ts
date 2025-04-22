import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlController } from './controllers/short-url.controller';
import { ShortUrlService } from './services/short-url.service';
import { ShortUrlRepository } from './repositories/short-url.repository';
import { ShortUrl } from './entities/short-url.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { RedirectController } from './controllers/redirect.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl]), ConfigModule, UserModule],
  controllers: [ShortUrlController, RedirectController],
  providers: [ShortUrlService, ShortUrlRepository],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}