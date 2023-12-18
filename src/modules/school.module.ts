import { SchoolController } from '#controllers/school.controller';
import NewsFeedEntity from '#entities/newsFeed.entity';
import SchoolEntity from '#entities/school.entity';
import SubscriptionEntity from '#entities/subscription.entity';
import UserEntity from '#entities/user.entity';
import { AuthorizationRepository } from '#repositories/authorization.repository';
import { SchoolRepository } from '#repositories/school.repository';
import { SubscriptionRepository } from '#repositories/subscription.repository';
import { UserRepository } from '#repositories/user.repository';
import { SchoolService } from '#services/school.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity, UserEntity, NewsFeedEntity, SubscriptionEntity])],
  controllers: [SchoolController],
  providers: [SchoolService, SchoolRepository, UserRepository, AuthorizationRepository, SubscriptionRepository],
})
export class SchoolModule {}
