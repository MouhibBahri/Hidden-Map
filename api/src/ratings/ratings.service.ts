import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    // Check if user already rated this location
    const existing = await this.ratingRepository.findOne({
      where: {
        user: { id: createRatingDto.userId },
        location: { id: createRatingDto.locationId },
      },
    });

    if (existing) {
      // Update existing rating
      existing.rating = createRatingDto.rating;
      return this.ratingRepository.save(existing);
    }

    // Create new rating
    const rating = this.ratingRepository.create({
      rating: createRatingDto.rating,
      user: { id: createRatingDto.userId },
      location: { id: createRatingDto.locationId },
    });
    return this.ratingRepository.save(rating);
  }

  async getAverageRating(locationId: string): Promise<number> {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'average')
      .where('rating.locationId = :locationId', { locationId })
      .getRawOne();

    return result?.average ? parseFloat(result.average) : 0;
  }

  async getRatingsByLocation(locationId: string): Promise<Rating[]> {
    return this.ratingRepository.find({
      where: { location: { id: locationId } },
      relations: ['user'],
    });
  }
}

