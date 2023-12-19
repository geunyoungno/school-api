import { NewsFeedController } from '#controllers/newsFeed.controller';
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
import { NewsFeedService } from '#services/newsFeed.service';
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
  controllers: [NewsFeedController],
  providers: [
    NewsFeedService,
    //
    AuthorizationRepository,
    NewsFeedRepository,
    SchoolRepository,
    SubscriptionRepository,
    UserRepository,
  ],
})
export class NewsFeedModule {}
