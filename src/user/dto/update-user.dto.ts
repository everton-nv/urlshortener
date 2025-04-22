import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas, números ou símbolos',
  })
  @IsOptional()
  password?: string;
}