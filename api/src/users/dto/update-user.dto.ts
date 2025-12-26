import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  isActive?: boolean;
}
