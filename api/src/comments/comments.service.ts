import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      commentText: createCommentDto.commentText,
      user: { id: createCommentDto.userId },
      location: { id: createCommentDto.locationId },
    });
    return this.commentRepository.save(comment);
  }

  async getCommentsByLocation(locationId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { location: { id: locationId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.softDelete(id);
  }
}

