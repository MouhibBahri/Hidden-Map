import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from '../dto/create-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  findOne(id: string): Promise<Photo | null> {
    return this.photoRepository.findOne({ where: { id } });
  }

  create(photoData: CreatePhotoDto): Promise<Photo> {
    const photo = this.photoRepository.create(photoData);
    return this.photoRepository.save(photo);
  }

  update(id: string, photoData: Partial<CreatePhotoDto>): Promise<Photo> {
    return this.photoRepository.save({ id, ...photoData });
  }

  async remove(id: string): Promise<void> {
    await this.photoRepository.softDelete(id);
  }
}
