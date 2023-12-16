import { AppController } from '#controllers/app.controller';
import { PluginModule } from '#plugins/plugin.module';
import { AppService } from '#services/app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PluginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
