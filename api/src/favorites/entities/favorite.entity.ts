import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity('favorites')
@Unique(['user', 'location']) // One favorite per user per location
export class Favorite extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, (location) => location.favorites)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}

