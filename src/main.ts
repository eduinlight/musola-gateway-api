import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { configApp } from './app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });

  const config = app.get(ConfigService);

  configApp(app);

  await app.listen(config.get('port'), '0.0.0.0');
}

bootstrap().then(() => {
  console.log('Service listening 👍: ', `${process.env.BASE_URL}`);
});
