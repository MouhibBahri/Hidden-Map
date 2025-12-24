import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { Location } from './location.entity';

@Entity('photos')
export class Photo extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => Location, (location) => location.photos)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}
