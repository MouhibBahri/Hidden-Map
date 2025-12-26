import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('locations/:locationId/favorite')
  addFavorite(
    @Param('locationId') locationId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create({
      ...createFavoriteDto,
      locationId,
    });
  }

  @Delete('locations/:locationId/favorite')
  removeFavorite(
    @Param('locationId') locationId: string,
    @Body() body: { userId: string },
  ) {
    return this.favoritesService.remove(body.userId, locationId);
  }

  @Post('locations/:locationId/favorite/check')
  checkFavorite(
    @Param('locationId') locationId: string,
    @Body() body: { userId: string },
  ) {
    return this.favoritesService.isFavorite(body.userId, locationId);
  }

  @Post('favorites')
  getUserFavorites(@Body() body: { userId: string }) {
    return this.favoritesService.getFavoritesByUser(body.userId);
  }
}

