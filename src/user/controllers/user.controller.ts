import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CustomRequest } from 'src/commons/interfaces/custom-request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.validateUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: CustomRequest) {
    return await this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(@Req() req: CustomRequest, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProfile(@Req() req: CustomRequest) {
    return await this.userService.remove(req.user.id);
  }
}