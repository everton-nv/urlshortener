import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: UserResponseDto) {
    const payload = {
      username: user.username, 
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get('JWT_EXPIRES_IN'),
    };
  }
}