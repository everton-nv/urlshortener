import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private mapToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      isActive: true,
    });

    return this.mapToDto(user);
  }

  async validateUser(loginDto: LoginUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada');
    }

    return this.mapToDto(user);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.mapToDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updates: Partial<User> = { ...updateUserDto };

    if (updateUserDto.password) {
      updates.password = await this.hashPassword(updateUserDto.password);
    }

    const user = await this.userRepository.update(id, updates);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.mapToDto(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}