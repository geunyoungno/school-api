import { SubscriptionController } from '#controllers/subscription.controller';
import AuthorizationEntity from '#entities/authorization.entity';
import NewsFeedEntity from '#entities/newsFeed.entity';
import SchoolEntity from '#entities/school.entity';
import SubscriptionEntity from '#entities/subscription.entity';
import UserEntity from '#entities/user.entity';
import { AuthorizationRepository } from '#repositories/authorization.repository';
import { NewsFeedRepository } from '#repositories/newsFeed.repository';
import { SchoolRepository } from '#repositories/school.repository';
import { SubscriptionRepository } from '#repositories/subscription.repository';
import { UserRepository } from '#repositories/user.repository';
import { SubscriptionService } from '#services/subscription.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //
      AuthorizationEntity,
      NewsFeedEntity,
      SchoolEntity,
      SubscriptionEntity,
      UserEntity,
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    //
    AuthorizationRepository,
    NewsFeedRepository,
    SchoolRepository,
    SubscriptionRepository,
    UserRepository,
  ],
})
export class SubscriptionModule {}
