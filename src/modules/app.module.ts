import { AppController } from '#controllers/app.controller';
import { SchoolModule } from '#modules/school.module';
import { PluginModule } from '#plugins/plugin.module';
import { AppService } from '#services/app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PluginModule, SchoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
