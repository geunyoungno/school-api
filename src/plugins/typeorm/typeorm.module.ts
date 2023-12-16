import { typeormProvider } from '#plugins/typeorm/typeorm.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [...typeormProvider],
  exports: [...typeormProvider],
})
export class TypeormModule {}
