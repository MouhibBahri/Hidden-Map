import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepsitory: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationRepsitory.find({ relations: ['photos'] });
  }

  findOne(id: string): Promise<Location | null> {
    return this.locationRepsitory.findOne({
      where: { id },
      relations: ['photos'],
    });
  }

  create(locationData: CreateLocationDto): Promise<Location> {
    const location = this.locationRepsitory.create(locationData);
    return this.locationRepsitory.save(location);
  }

  update(id: string, locationData: UpdateLocationDto): Promise<Location> {
    return this.locationRepsitory.save({ id, ...locationData });
  }

  async remove(id: string): Promise<void> {
    await this.locationRepsitory.softDelete(id);
  }
}
