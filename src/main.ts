import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/exception/handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
