import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Max,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePhotoDto } from './create-photo.dto';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 8 })
  @Min(-90)
  @Max(90)
  latitude: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 8 })
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhotoDto)
  photos: CreatePhotoDto[];
}
