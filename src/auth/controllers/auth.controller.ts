import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserService } from 'src/user/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    return this.authService.login(user);
  }
}