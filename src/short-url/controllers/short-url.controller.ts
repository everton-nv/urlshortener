import { Controller, Get, Post, Body, Param, Delete, Put, Req, Res, HttpStatus, Redirect } from '@nestjs/common';
import { ShortUrlService } from '../services/short-url.service';
import { CreateShortUrlDto } from '../dto/create-short-url.dto';
import { UpdateShortUrlDto } from '../dto/update-short-url.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { CustomRequest } from 'src/commons/interfaces/custom-request.interface';
import { OptionalJwtAuthGuard } from 'src/auth/guard/optional-jwt-auth.guard';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  async create(@Body() createShortUrlDto: CreateShortUrlDto, @Req() req: CustomRequest) {
    const userId = req.user?.id || null;
    return await this.shortUrlService.createShortUrl(createShortUrlDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@Req() req: CustomRequest) {
    return await this.shortUrlService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details/:id')
  async findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.shortUrlService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShortUrlDto: UpdateShortUrlDto,
    @Req() req: CustomRequest,
  ) {
    return await this.shortUrlService.update(id, req.user.id, updateShortUrlDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.shortUrlService.remove(id, req.user.id);
  }
}