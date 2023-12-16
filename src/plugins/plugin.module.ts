import { TypeormModule } from '#plugins/typeorm/typeorm.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeormModule],
})
export class PluginModule {}
