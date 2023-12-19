import { AppModule } from '#modules/app.module';
import { SwaggerService } from '#plugins/swagger/swagger.service';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.get(SwaggerService).bootstrap(app);

  await app.listen(3000);
}
bootstrap();
