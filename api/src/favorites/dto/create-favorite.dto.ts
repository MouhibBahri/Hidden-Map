import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  locationId: string;
}

