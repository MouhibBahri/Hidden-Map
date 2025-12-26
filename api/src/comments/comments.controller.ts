import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('locations/:locationId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  addComment(
    @Param('locationId') locationId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      locationId,
    });
  }

  @Get()
  getComments(@Param('locationId') locationId: string) {
    return this.commentsService.getCommentsByLocation(locationId);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}

