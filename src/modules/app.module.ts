import { AppController } from '#controllers/app.controller';
import { NewsFeedModule } from '#modules/newsFeed.module';
import { SchoolModule } from '#modules/school.module';
import { SubscriptionModule } from '#modules/subscription.module';
import { PluginModule } from '#plugins/plugin.module';
import { AppService } from '#services/app.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [PluginModule, SchoolModule, NewsFeedModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
