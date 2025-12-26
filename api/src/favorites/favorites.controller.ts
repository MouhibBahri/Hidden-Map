import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('locations/:locationId/favorite')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(
    @Param('locationId') locationId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create({
      ...createFavoriteDto,
      locationId,
    });
  }

  @Delete()
  removeFavorite(
    @Param('locationId') locationId: string,
    @Body() body: { userId: string },
  ) {
    return this.favoritesService.remove(body.userId, locationId);
  }

  @Get('check/:userId')
  checkFavorite(
    @Param('locationId') locationId: string,
    @Param('userId') userId: string,
  ) {
    return this.favoritesService.isFavorite(userId, locationId);
  }
}

