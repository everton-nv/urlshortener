import { Controller, Get, Param, Redirect, HttpStatus } from '@nestjs/common';
import { ShortUrlService } from '../services/short-url.service';

@Controller()
export class RedirectController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.shortUrlService.redirect(shortCode);
    return { url, statusCode: HttpStatus.TEMPORARY_REDIRECT };
  }
}