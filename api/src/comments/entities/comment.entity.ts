import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { User } from '../../users/entities/user.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity('comments')
export class Comment extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  commentText: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, (location) => location.comments)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}

