import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { NotificationResponseDto } from './dto/notification-response.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAllByUser(userId: string): Promise<NotificationResponseDto> {
    console.log(`Fetching notifications for user: ${userId}`);
    
    const notifications = await this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    console.log(`Found ${notifications.length} notifications for user ${userId}`);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return {
      notifications,
      unreadCount,
    };
  }

  async markAsRead(id: number, userId: string): Promise<void> {
    await this.notificationRepository.update(
      { id, userId },
      { read: true },
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { userId, read: false },
      { read: true },
    );
  }

  async create(
    userId: string,
    type: NotificationType,
    message: string,
    metadata?: {
      locationId?: string;
      locationName?: string;
      points?: number;
    },
  ): Promise<Notification> {
    console.log(`Creating notification for user ${userId}: type=${type}, message=${message}`);
    
    const notification = this.notificationRepository.create({
      userId,
      type,
      message,
      metadata,
    });

    const savedNotification = await this.notificationRepository.save(notification);
    console.log(`Notification saved with id: ${savedNotification.id}`);
    
    return savedNotification;
  }
}
