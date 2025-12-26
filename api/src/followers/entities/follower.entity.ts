import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { User } from '../../users/entities/user.entity';

@Entity('followers')
@Unique(['user', 'followerUser']) // One follow relationship per user pair
export class Follower extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'userId' })
  user: User; // The user being followed

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'followerUserId' })
  followerUser: User; // The user who is following
}

