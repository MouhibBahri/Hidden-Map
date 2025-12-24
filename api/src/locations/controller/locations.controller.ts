import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationsService } from '../service/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  getAllLocations() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Put(':id')
  updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  deleteLocation(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
