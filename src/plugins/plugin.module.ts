import { HttpExceptionFilter } from '#plugins/filter/http-exception.filter';
import { SwaggerModule } from '#plugins/swagger/swagger.module';
import { TypeormModule } from '#plugins/typeorm/typeorm.module';
import { Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [TypeormModule, SwaggerModule],
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class PluginModule {}
