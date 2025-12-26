import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity('ratings')
@Unique(['user', 'location']) // One rating per user per location
export class Rating extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  rating: number; // 1-5 stars

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, (location) => location.ratings)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}

