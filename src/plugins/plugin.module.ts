import { TypeormModule } from '#plugins/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { SwaggerModule } from '#plugins/swagger/swagger.module';

@Module({
  imports: [TypeormModule, SwaggerModule],
})
export class PluginModule {}
