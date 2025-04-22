import { Request } from 'express';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export interface CustomRequest extends Request {
  user?: UserResponseDto;
}