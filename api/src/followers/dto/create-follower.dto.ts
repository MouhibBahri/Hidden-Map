import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFollowerDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string; // User being followed

  @IsUUID()
  @IsNotEmpty()
  followerUserId: string; // User who is following
}

