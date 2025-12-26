import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('locations/:locationId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  rateLocation(
    @Param('locationId') locationId: string,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingsService.create({
      ...createRatingDto,
      locationId,
    });
  }

  @Get()
  getRatings(@Param('locationId') locationId: string) {
    return this.ratingsService.getRatingsByLocation(locationId);
  }

  @Get('average')
  getAverageRating(@Param('locationId') locationId: string) {
    return this.ratingsService.getAverageRating(locationId);
  }
}

